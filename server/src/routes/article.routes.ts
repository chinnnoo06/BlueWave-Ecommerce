import express from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/handleInputErrors';
import { addArticle, getArticles, getInitialsArticles, getOneArticle } from '../controllers/article.controller';
import { auth } from '../middleware/auth';


const router = express.Router();

router.post(
    "/add",
    auth(['admin']),

    /* -------------------------------------------------------------------------- */
    /*                               BASIC FIELDS                                 */
    /* -------------------------------------------------------------------------- */

    body("slug")
        .notEmpty().withMessage("El slug es obligatorio")
        .isString(),

    body("title")
        .notEmpty().withMessage("El título es obligatorio")
        .isString(),

    body("excerpt")
        .notEmpty().withMessage("El excerpt es obligatorio")
        .isString(),

    body("category")
        .notEmpty().withMessage("La categoría es obligatoria")
        .isString(),

    body("coverImage")
        .notEmpty().withMessage("La imagen de portada es obligatoria")
        .isString(),

    body("publishedAt")
        .notEmpty().withMessage("La fecha de publicación es obligatoria")
        .isISO8601().withMessage("publishedAt debe ser una fecha válida"),

    body("tags")
        .optional()
        .isArray().withMessage("tags debe ser un array de strings"),

    body("tags.*")
        .optional()
        .isString(),

    /* -------------------------------------------------------------------------- */
    /*                                   SEO                                      */
    /* -------------------------------------------------------------------------- */

    body("seo.metaTitle")
        .notEmpty().withMessage("El metaTitle es obligatorio")
        .isString(),

    body("seo.metaDescription")
        .notEmpty().withMessage("El metaDescription es obligatorio")
        .isString(),

    /* -------------------------------------------------------------------------- */
    /*                               CONTENT BLOCKS                               */
    /* -------------------------------------------------------------------------- */

    body("content")
        .isArray({ min: 1 })
        .withMessage("El contenido debe ser un array con al menos un bloque"),

    body("content.*.type")
        .notEmpty()
        .isIn(["paragraph", "heading", "list", "quote"])
        .withMessage("Tipo de bloque inválido"),

    /* ----------------------------- Paragraph ---------------------------------- */
    body("content.*")
        .if(body("content.*.type").equals("paragraph"))
        .custom((block) => {
            if (!block.text) {
                throw new Error("El bloque paragraph requiere text")
            }
            return true
        }),

    /* ------------------------------ Heading ----------------------------------- */
    body("content.*")
        .if(body("content.*.type").equals("heading"))
        .custom((block) => {
            if (!block.text || !block.level) {
                throw new Error("El bloque heading requiere text y level")
            }
            if (![2, 3].includes(block.level)) {
                throw new Error("El level del heading debe ser 2 o 3")
            }
            return true
        }),

    /* -------------------------------- List ------------------------------------ */
    body("content.*")
        .if(body("content.*.type").equals("list"))
        .custom((block) => {
            if (
                typeof block.ordered !== "boolean" ||
                !Array.isArray(block.items)
            ) {
                throw new Error("El bloque list requiere ordered e items")
            }
            return true
        }),

    /* -------------------------------- Quote ----------------------------------- */
    body("content.*")
        .if(body("content.*.type").equals("quote"))
        .custom((block) => {
            if (!block.text) {
                throw new Error("El bloque quote requiere text")
            }
            return true
        }),

    /* -------------------------------------------------------------------------- */
    /*                               FINAL CHECK                                  */
    /* -------------------------------------------------------------------------- */

    handleInputErrors,
    addArticle
)

router.get("/get", getArticles)

router.get("/get-initials/:excluded",
    param('excluded').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    getInitialsArticles
)

router.get("/get-initials",
    getInitialsArticles
)

router.get("/get/:slug",
    param('slug').notEmpty().withMessage("El slug es obligatorio"),
    handleInputErrors,
    getOneArticle
)


export default router;