import * as UserService from "../service/UserService"
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';


export const registration = async (req, res) => {
    if (req.body.password !== req.body.repeatPassword) {
        return res.status(404).send("Пароли не совпадают!");
    }
    if ( await UserService.findByUsername(req.body.username)) {
        return res.status(409).send("Пользователь уже существует!");
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await UserService.save(req.body);
        return res.send("Пользователь успешно добавлен!")
    }
}

export const login = async (req, res) => {
    let user = await UserService.findByUsername(req.body.username);
    if (!user) { return res.status(404).send("Пользователь не найден!"); } 

    let isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) { return res.status(404).send("Неверное имя пользователя или пароль!"); } 

    const token = jwt.sign({id: user.id, role: user.role, organisation: user.organisation.name}, "rissecretkey");
    return res.status(200).cookie("auth", token, {httpOnly: true, secure: true, SameSite: 'none', maxAge: 2600000}).send({role: user.role, organisation: user.organisation.name});
}

export const logout = async (req, res) => {
    return res.clearCookie("auth").end();
}

export const deleteUser = async (req, res) => {
    await UserService.deleteById(req.params.id);
    return res.end();
}

export const findAllUsers = async (req, res) => {
    let users = await UserService.findAll();
    return res.send(users);
}

export const authCheck = async (req, res) => {
    const token = req.cookies.auth;
        if (token) {
            jwt.verify(token, "rissecretkey", (err, data) => {
                if (err) return res.status(403).send("Токен не валиден!");
                
                return res.send({role: data.role, organisation: data.organisation});
                    
            })
        } else return res.status(401).send("Пользователь не авторизирован!");
}