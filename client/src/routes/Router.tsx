import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layout/MainLayout"
import { lazy, Suspense } from "react"
import { Spinner } from "../components/ui/Spinner"
import { AuthLayout } from "../layout/AuthLayout"
import { AppInitializer } from "../app/AppInitializer"
import { ScrollToTop } from "../components/ui/ScrollToTop"
import { ProfileLayout } from "../layout/ProfileLayout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const HomePage = lazy(() =>
    import('../pages/home/HomePage').then(module => ({
        default: module.HomePage
    }))
)
const LoginPage = lazy(() =>
    import('../pages/auth/LoginPage').then(module => ({
        default: module.LoginPage
    }))
)
const RegisterPage = lazy(() =>
    import('../pages/auth/RegisterPage').then(module => ({
        default: module.RegisterPage
    }))
)
const VerifyAccountPage = lazy(() =>
    import('../pages/auth/VerifyAccounPage').then(module => ({
        default: module.VerifyAccountPage
    }))
)
const RecoverPasswordPage = lazy(() =>
    import('../pages/auth/RecoverPasswordPage').then(module => ({
        default: module.RecoverPasswordPage
    }))
)
const AboutPage = lazy(() =>
    import('../pages/about/AboutPage').then(module => ({
        default: module.AboutPage
    }))
)
const ContactPage = lazy(() =>
    import('../pages/contact/ContactPage').then(module => ({
        default: module.ContactPage
    }))
)
const ArticlePage = lazy(() =>
    import('../pages/article/ArticlePage').then(module => ({
        default: module.ArticlesPage
    }))
)
const ArticleBlogPage = lazy(() =>
    import('../pages/article/ArticleBlogPage').then(module => ({
        default: module.ArticleBlogPage
    }))
)
const RemoveSubscriberPage = lazy(() =>
    import('../pages/subscriber/RemoveSubscriberPage').then(module => ({
        default: module.RemoveSubscriberPage
    }))
)
const ProfileInfoPage = lazy(() =>
    import('../pages/profile/ProfileInfoPage').then(module => ({
        default: module.ProfileInfoPage
    }))
)
const ProfileAddressPage = lazy(() =>
    import('../pages/profile/ProfileAddressPage').then(module => ({
        default: module.ProfileAddressPage
    }))
)
const ProfileFavoritesPage = lazy(() =>
    import('../pages/profile/ProfileFavoritesPage').then(module => ({
        default: module.ProfileFavoritesPage
    }))
)
const ProfilePurchasesPage = lazy(() =>
    import('../pages/profile/ProfilePurchasesPage').then(module => ({
        default: module.ProfilePurchasesPage
    }))
)
const CatalogPage = lazy(() =>
    import('../pages/catalog/CatalogPage').then(module => ({
        default: module.CatalogPage
    }))
)
const ProductPage = lazy(() =>
    import('../pages/product/ProductPage').then(module => ({
        default: module.ProductPage
    }))
)
const CartPage = lazy(() =>
    import('../pages/Cart/CartPage').then(module => ({
        default: module.CartPage
    }))
)
const PurchasePage = lazy(() =>
    import('../pages/purchase/PurchasePage').then(module => ({
        default: module.PurchasePage
    }))
)
const PurchaseSuccessPage = lazy(() =>
    import('../pages/purchase/PurchaseSuccessPage').then(module => ({
        default: module.PurchaseSuccessPage
    }))
)
const PurchaseCancelPage = lazy(() =>
    import('../pages/purchase/PurchaseCancelPage').then(module => ({
        default: module.PurchaseCancelPage
    }))
)
const PrivacyPage = lazy(() =>
    import('../pages/politics/PrivacyPage').then(module => ({
        default: module.PrivacyPage
    }))
)
const TermsPage = lazy(() =>
    import('../pages/politics/TermsPage').then(module => ({
        default: module.TermsPage
    }))
)

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <ScrollToTop />
            <AppInitializer>
                <Routes>
                    <Route element={<AuthLayout />}>

                        <Route path='/iniciar-sesion' element={
                            <Suspense fallback={<Spinner />}>
                                <LoginPage />
                            </Suspense>
                        } />

                        <Route path='/registrarse' element={
                            <Suspense fallback={<Spinner />}>
                                <RegisterPage />
                            </Suspense>
                        } />

                        <Route path='/verificar-cuenta' element={
                            <Suspense fallback={<Spinner />}>
                                <VerifyAccountPage />
                            </Suspense>
                        } />

                        <Route path='/recuperar-contraseña' element={
                            <Suspense fallback={<Spinner />}>
                                <RecoverPasswordPage />
                            </Suspense>
                        } />

                    </Route>

                    <Route element={<MainLayout />}>

                        <Route path='/' element={
                            <Suspense fallback={<Spinner />}>
                                <HomePage />
                            </Suspense>
                        } index />

                        <Route path='/sobre-nosotros' element={
                            <Suspense fallback={<Spinner />}>
                                <AboutPage />
                            </Suspense>
                        } />

                        <Route path='/contacto' element={
                            <Suspense fallback={<Spinner />}>
                                <ContactPage />
                            </Suspense>
                        } />

                        <Route path='/articulos' element={
                            <Suspense fallback={<Spinner />}>
                                <ArticlePage />
                            </Suspense>
                        } />

                        <Route path='/articulos/:slug' element={
                            <Suspense fallback={<Spinner />}>
                                <ArticleBlogPage />
                            </Suspense>
                        } />

                        <Route path='/catalogo/:category/:page' element={
                            <Suspense fallback={<Spinner />}>
                                <CatalogPage />
                            </Suspense>
                        } />

                        <Route path='/producto/:slugId' element={
                            <Suspense fallback={<Spinner />}>
                                <ProductPage />
                            </Suspense>
                        } />

                        <Route path='/pedido' element={
                            <Suspense fallback={<Spinner />}>
                                <CartPage />
                            </Suspense>
                        } />

                        <Route path='/confirmar-compra' element={
                            <Suspense fallback={<Spinner />}>
                                <PurchasePage />
                            </Suspense>
                        } />

                        <Route path='/compra-exitosa' element={
                            <Suspense fallback={<Spinner />}>
                                <PurchaseSuccessPage />
                            </Suspense>
                        } />

                        <Route path='/compra-cancelada' element={
                            <Suspense fallback={<Spinner />}>
                                <PurchaseCancelPage />
                            </Suspense>
                        } />

                        <Route path="/perfil" element={<ProfileLayout />}>
                            <Route index element={<Navigate to="/perfil/informacion" replace />} />

                            <Route path='/perfil/informacion' element={
                                <Suspense fallback={<Spinner />}>
                                    <ProfileInfoPage />
                                </Suspense>
                            } />

                            <Route path='/perfil/direccion' element={
                                <Suspense fallback={<Spinner />}>
                                    <ProfileAddressPage />
                                </Suspense>
                            } />

                            <Route path='/perfil/favoritos' element={
                                <Suspense fallback={<Spinner />}>
                                    <ProfileFavoritesPage />
                                </Suspense>
                            } />

                            <Route path='/perfil/mis-compras' element={
                                <Suspense fallback={<Spinner />}>
                                    <ProfilePurchasesPage />
                                </Suspense>
                            } />
                        </Route>

                        <Route path='/privacidad' element={
                            <Suspense fallback={<Spinner />}>
                                <PrivacyPage />
                            </Suspense>
                        } />

                        <Route path='/terminos' element={
                            <Suspense fallback={<Spinner />}>
                                <TermsPage />
                            </Suspense>
                        } />


                    </Route>

                    <Route path='/desubscribir' element={
                        <Suspense fallback={<Spinner />}>
                            <RemoveSubscriberPage />
                        </Suspense>
                    } />

                </Routes>
            </AppInitializer>
        </BrowserRouter>
    )
}
