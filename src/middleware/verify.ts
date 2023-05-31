import * as jwt from 'jsonwebtoken';

export const verify = (role) => {
    
    return (req, res, next) => {
        const token = req.cookies.auth;
        if (token) {
            jwt.verify(token, "rissecretkey", (err, data) => {
                if (err) return res.status(403).send("Токен не валиден!");
                 
                if ((role === "admin" && data.role === "Администратор") ||
                    (role === "operator" && data.role === "Администратор") ||
                    (role === "operator" && data.role === "Оператор")) {
                        req.user = data;
                        next();
                    } else {
                        return res.status(401).send("У пользователя нет прав на соверешение операции!");
                    }   
            })
        } else return res.status(401).send("Пользователь не авторизирован!");
    }
}