import { Router } from "../common/router";
import restify from "restify";
import { User } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.createServer) {
    /**
     *
     * @description endpont /users lista todos os usuarios
     *
     */
    application.get("/users", (req, res, next) => {
      User.find().then((users) => {
        res.json(users);
        return next();
      });
    });
    /**
     *
     * @description: endpont find by id, puxa apenas um usuario por id
     *
     */
    application.get("/users/:id", async (req, res, next) => {
      const userId = req.params.id;

      const result = await User.findById(userId);
      if (result) {
        res.json(result);
        return next();
      } else {
        res.send(404);
        return next();
      }
    });
    /**
     *
     * @description: endpont para enviar um documento ao bando de dados
     *
     */
    application.post("/users", (req, res, next) => {
      let user = new User(req.body);
      user.save().then((user) => {
        user.password = undefined;
        res.json(user);
        return next();
      });
    });
    /**
     *
     * @description: endpont que atualizar parcialmente dados no banco
     *
     */
    application.patch("/users/:id", (req, res, next) => {
      /**
       * Define um objeto de opções para o método do Mongoose.
       * new: true significa que, após a atualização, o método
       * deve retornar o documento já atualizado em vez do documento antigo.
       */
      const options = { new: true };
      /**
       *
       * Usa o modelo User do Mongoose para encontrar e atualizar um documento no banco.
       * findByIdAndUpdate recebe três argumentos:
       * @param req.params.id → o ID do usuário passado na URL (/user/:id).
       * @param req.body → os dados a serem atualizados (que já foram tratados pelo seu parser mergePatchBodyParser).
       * @param options → configuração (new: true) para devolver o documento atualizado.
       * @returns retorna uma Promise, por isso é encadeado com .then.
       *
       */
      User.findByIdAndUpdate(req.params.id, req.body, options).then((user) => {
        if (user) {
          res.json(user);
          return next();
        }
        res.send(404);
        return next();
      });
    });
    /**
     *
     * @description: endpont que deleta um registro do banco
     *
     */
    application.del("/users/:id", (req, res, next) => {
      User.deleteOne({ _id: req.params.id }).then((result) => {
        return res.send(result);
      });
    });
  }
}

export const usersRouter = new UsersRouter();
