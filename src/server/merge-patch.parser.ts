import * as restify from "restify";

/**==================== Description ======================
 * Esse middleware atua como um parser customizado que só processa requisições
 * PATCH com Content-Type: application/merge-patch+json. Ele:
 * Armazena o corpo cru da requisição.
 * Tenta converter o corpo em JSON.
 * Interrompe com erro caso o conteúdo seja inválido.
 * Continua o fluxo normalmente se for válido ou se não se aplicar.
 * =======================================================
 */

/**
 *
 * @constant mpContentType
 * Cria uma constante para armazenar o
 * MIME type padrão usado quando a requisição é
 * enviada como JSON Merge Patch (application/merge-patch+json).
 *
 */
const mpContentType = "application/merge-patch+json";

/**
 *
 * @description
 * Essa função segue o padrão middleware do Restify, ou seja, recebe os parâmetros:
 * @param req :objeto da requisição, contendo headers, corpo, método HTTP etc.
 * @param res :objeto da resposta, usado para enviar dados de volta ao cliente.
 * @param next :função callback para passar o controle ao próximo middleware ou rota.
 *
 */
export const mergePatchBodyParser = (req, res, next) => {
  /**
   *
   * @description
   * Verifica duas condições ao mesmo tempo:
   * (1) -> O Content-Type da requisição é application/merge-patch+json.
   * (2) -> O método HTTP é PATCH.
   *
   */
  if (req.getContentType() === mpContentType && req.method === "PATCH") {
    /**
     *
     * @description
     * Cria uma propriedade extra chamada rawBody dentro do objeto req.
     * é feito um type cast para any, porque o tipo padrão de req não inclui essa propriedade.
     * O objetivo é guardar o corpo original da requisição antes de qualquer modificação, útil para debug ou logs.
     *
     */
    (<any>req).rawBody = req.body;
    /**
     *
     * @description
     * Usa JSON.parse para transformar o corpo da requisição (string JSON) em um objeto JavaScript.
     * Caso o body não seja um JSON válido, o JSON.parse lança um erro.
     * Esse erro é capturado no catch, e o middleware retorna um erro customizado com a mensagem "Invalid content", encerrando a requisição.
     *
     */
    try {
      req.body = JSON.parse(req.body);
    } catch (err) {
      return next(new Error(`Invalid content: ${err.message}`));
    }
  }
  /**
   * Se tudo correu bem (ou se a requisição não era PATCH com merge-patch+json), chama next() para passar o controle ao próximo middleware ou handler de rota.
   * Isso mantém o fluxo normal do Restify.
   */
  return next();
};
