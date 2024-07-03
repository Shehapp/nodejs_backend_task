const {getUserByEmailService, addUserService} = require('../../services/auth_service');
const { User } = require("../../models");



jest.mock("../../models", () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}));



describe('getUserByEmailService', () => {
    it("should return user if exist ", async () => {
        var user = {
            id: 1,
            email: "ok@ok.ok",
            password: "ok"
        };

        User.findOne.mockResolvedValue(user);
        const result = await getUserByEmailService("ok@ok.ok");
        expect(result).toEqual(user);
        expect(User.findOne).toBeCalledWith({where: {email: "ok@ok.ok"}});

    });

    it("should throw error if user not found", async () => {
        User.findOne.mockResolvedValue(null);
        await expect(getUserByEmailService("ok@ok.ok")).rejects.toEqual({
            status: 404,
            message: 'User not found'
        });
        expect(User.findOne).toBeCalledWith({where: {email: "ok@ok.ok"}});

    }
    );
});


describe('addUserService', () => {
    it("should create a new user", async () => {
        const res={
            body:{
                email:"ok@ok.ok",
                password:"ok"
            }
        }
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(res.body);
        const result = await addUserService(res);
        expect(result.email).toEqual(res.body.email);
    }
    );

    it("should throw error if required fields are not filled", async () => {
        const res={
            body:{
                password:"ok"
            }
        }
        await expect(addUserService(res)).rejects.toEqual({
            status: 400,
            message: 'Please fill in all fields'
        });
    }
    );

    it("should throw error if user already exists", async () => {
        const res={
            body:{
                email:"ok@ok.ok",
                password:"ok"
            }
        }
        User.findOne.mockResolvedValue(res.body);   
        await expect(addUserService(res)).rejects.toEqual({
            status: 409,
            message: 'User already exists'
        });

    }
    );

    it("should hash password", async () => {
        const res={
            body:{
                email:"ok@ok.ok",
                password:"ok"
            }
        }
        User.findOne.mockResolvedValue(null);   
        User.create.mockResolvedValue({
            email: "ok@ok.ok",
            password: "5ds54dlkfjdf5"//hashed password
        });
        const result = await addUserService(res);
        expect(result.password).not.toEqual(res.body.password);
    }
    );

});

