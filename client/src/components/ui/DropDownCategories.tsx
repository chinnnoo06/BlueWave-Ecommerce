import { Link } from "react-router-dom";

type TDropDownCategoriesProps = {
  mobile?: boolean,
  onClose: () => void
};

export const DropDownCategories = ({ mobile = false, onClose }: TDropDownCategoriesProps) => {
  return (
    <>
      <h4 className="font-semibold text-base header-limit:text-lg text-[#001F3F] mb-4">
        ¿Qué estás buscando?
      </h4>

      <div
        className={`
          flex ${mobile ? 'gap-3' : 'gap-8'}
          ${mobile ? "flex-col" : "flex-row justify-between"}
          border-t border-[#001F3F]/20 pt-4
        `}
      >
        <div className="flex flex-col gap-3">
          <Link to="/catalogo/audifonos-over-ear/1" onClick={onClose} className="font-medium text-sm header-limit:text-base text-[#001F3F] hover:text-[#0C71E4] hover:font-semibold transition">
            Audífonos Over-Ear
          </Link>
          <Link to="/catalogo/audifonos-in-ear/1" onClick={onClose} className="font-medium text-sm header-limit:text-base text-[#001F3F] hover:text-[#0C71E4] hover:font-semibold transition">
            Audífonos In-Ear
          </Link>
          {!mobile && (
            <Link to="/catalogo/todos/1" onClick={onClose} className="font-medium text-[#001F3F] text-sm header-limit:text-base hover:text-[#0C71E4] hover:font-semibold transition">
              Descubrir Todo
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/catalogo/bocinas/1" onClick={onClose} className="font-medium text-[#001F3F] text-sm header-limit:text-base hover:text-[#0C71E4] hover:font-semibold transition">
            Bocinas
          </Link>
          <Link to="/catalogo/accesorios/1" onClick={onClose} className="font-medium text-[#001F3F] text-sm header-limit:text-base hover:text-[#0C71E4] hover:font-semibold transition">
            Accesorios
          </Link>
          {mobile && (
            <Link to="/catalogo/todos/1" onClick={onClose} className="font-medium text-[#001F3F] text-sm header-limit:text-base hover:text-[#0C71E4] hover:font-semibold transition">
              Descubrir Todo
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
