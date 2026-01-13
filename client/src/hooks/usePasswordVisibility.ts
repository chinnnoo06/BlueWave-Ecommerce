import { useState } from "react";

export const usePasswordVisibility = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return {
        showOldPassword,
        showPassword,
        showConfirmPassword,
        handleOldPasswordVisibility,
        handlePasswordVisibility,
        handleConfirmPasswordVisibility,
        inputTypeOldPassword: showOldPassword ? "text" : "password",
        inputTypePassword: showPassword ? "text" : "password",
        inputTypeConfirmPassword: showConfirmPassword ? "text" : "password",
    }
}
