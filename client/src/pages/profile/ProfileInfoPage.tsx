import { useState } from "react";
import { ProfileInfoEditForm } from "../../components/profile/profile-personal-info/ProfileInfoEditForm";
import { ProfileInfo } from "../../components/profile/profile-personal-info/ProfileInfo";
import { ProfileInfoPassword } from "../../components/profile/profile-personal-info/ProfileInfoPassword";
import { ProfileInfoPasswordEditForm } from "../../components/profile/profile-personal-info/ProfileInfoPasswordEditForm";

export const ProfileInfoPage = () => {
  const [showEditInfoForm, setShowEditInfoForm] = useState(false)
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-col">
        <h2 className="text-[#001F3F] font-bold leading-tight text-[1.5rem] lg:text-[2rem] mb-6 relative inline-block">
          Información Personal
        </h2>

        <div className="flex flex-col md:flex-row gap-5">

          <div className="flex flex-col h-full p-6 rounded-xl shadow-sm md:w-1/2">

            {showEditInfoForm ? (
              <ProfileInfoEditForm setShowEditInfoForm={setShowEditInfoForm} />
            ) : (
              <ProfileInfo setShowEditInfoForm={setShowEditInfoForm} />
            )}

          </div>

          <div className="flex flex-col h-full p-6 rounded-xl shadow-sm md:w-1/2">
            {showEditPasswordForm ? (
              <ProfileInfoPasswordEditForm setShowEditPasswordForm={setShowEditPasswordForm}/>
            ) : (
              <ProfileInfoPassword setShowEditPasswordForm={setShowEditPasswordForm}/>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
