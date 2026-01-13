import { toast } from 'react-toastify';
import { useFormStatus } from '../../../hooks/useFormStatus';
import { useAppStore } from '../../../stores/useAppStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TProfileInfoProps } from './types';
import { ArrowLeft } from 'lucide-react';
import type { TProfileInfoEditForm } from '../../../types/profile.types';
import { ProfileInfoEditFormSchema } from '../../../schemas/profile.schema';
import { inputProfileBase } from '../../../helpers/styleClasses/inputs';

export const ProfileInfoEditForm = ({ setShowEditInfoForm }: TProfileInfoProps) => {
  const { loading, startLoading, stopLoading } = useFormStatus();
  const { user, editProfileInfo } = useAppStore()
  const { register, handleSubmit, formState: { errors } } = useForm<TProfileInfoEditForm>({
    resolver: zodResolver(ProfileInfoEditFormSchema),
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      phone: user?.phone || ""
    }
  })

  const onSubmit = async (data: TProfileInfoEditForm) => {
    startLoading()

    try {
      await editProfileInfo(data)

      setShowEditInfoForm(false)

      toast.success('Información actualizada correctamente', {
        className: 'toast-success',
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error inesperado"
      );
    } finally {
      stopLoading()
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base lg:text-lg text-[#001F3F]">Editar Datos Personales</h3>
        <button
          onClick={() => setShowEditInfoForm(false)}
          className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
        >
          <ArrowLeft size={16} />
          Regresar
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-0">

          <div className="py-4">
            <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
              Nombre
            </label>
            <input
              {...register("name")}
              placeholder="Escribe tu nombre"
              className={inputProfileBase}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="border-t border-[#001F3F]/25" />

          <div className="py-4">
            <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
              Apellidos
            </label>
            <input
              {...register("surname")}
              placeholder="Escribe tus apellidos"
              className={inputProfileBase}
            />
            {errors.surname && (
              <p className="text-xs text-red-500 mt-1">
                {errors.surname?.message}
              </p>
            )}
          </div>
          <div className="border-t border-[#001F3F]/25" />

          <div className="py-4">
            <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
              Correo Electrónico
            </label>
            <input
              {...register("email")}
              placeholder="correo@ejemplo.com"
              className={inputProfileBase}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="border-t border-[#001F3F]/25" />

          <div className="py-4">
            <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
              Número Telefónico
            </label>
            <input
              {...register("phone")}
              placeholder="10 dígitos"
              className={inputProfileBase}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-[#001F3F]/25" />

        <div className="pt-4 flex justify-center">
          <button
            disabled={loading}
            type="submit"
            className="py-1.5 px-6 text-sm rounded-lg font-medium
                       text-[#EEEEEF] bg-[#001F3F]
                       hover:bg-[#0C71E4] transition shadow-md"
          >
            {loading ? 'Cargando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </>
  )
}