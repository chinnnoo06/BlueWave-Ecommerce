import { Award, Lightbulb, Mail, MapPin, Palette, Phone, Recycle, ThumbsUp, Volume2, type LucideIcon } from "lucide-react";
import { User, Heart, ShoppingBag, Shield, FileText } from "lucide-react";
import type { TRegion } from "../types/contact.types";

type TOurValues = {
    icon: LucideIcon,
    title: string,
    text: string

}

export const ourValues: TOurValues[] = [
    {
        icon: Award,
        title: "Calidad",
        text: "Cada producto está cuidadosamente seleccionado para ofrecer el mejor rendimiento, durabilidad y confianza en cada uso."
    },
    {
        icon: ThumbsUp,
        title: "Clientes satisfechos",
        text: "La satisfacción de nuestros clientes es nuestra prioridad, respaldada por experiencias positivas y reseñas reales."
    },
    {
        icon: Volume2,
        title: "Pasión por el sonido",
        text: "Vivimos y respiramos audio, buscando siempre un sonido claro, potente y fiel en cada detalle."
    },
    {
        icon: Lightbulb,
        title: "Innovación",
        text: "Integramos tecnología e ideas creativas para desarrollar productos modernos que marcan la diferencia."
    },
    {
        icon: Palette,
        title: "Excelente diseño",
        text: "Diseños modernos y funcionales que combinan estética, comodidad y estilo en cada producto."
    },
    {
        icon: Recycle,
        title: "Sustentabilidad",
        text: "Apostamos por prácticas responsables y materiales conscientes para reducir nuestro impacto ambiental."
    }
]

export type TTarget = {
    icon: LucideIcon
    title: string
    text: string
}

export const contactTargets: TTarget[] = [
    {
        icon: Phone,
        title: "Call Center",
        text: "+55 33 1823 7277",
    },
    {
        icon: Mail,
        title: "Correo de Soporte",
        text: "support@bluewave.com",
    },
    {
        icon: MapPin,
        title: "Tienda Principal",
        text: "Calz. Gral. Mariano Escobedo 425, Chapultepec Morales, Polanco V Secc, Miguel Hidalgo, 11000 Ciudad de México, CDMX",
    },
]

export const regions: TRegion[] = [
    {
        region: "Guadalajara, Jalisco",
        stores: [
            {
                name: "BlueWave Store Chapultepec",
                ubication: "Av. Chapultepec Sur 120, Col. Americana",
                schedule: "Lunes a Sábado 10:00 - 19:00",
                phone: "33 1234 5678"
            },
            {
                name: "BlueWave Store Andares",
                ubication: "Plaza Andares, Blvd. Puerta de Hierro",
                schedule: "Lunes a Domingo 11:00 - 21:00",
                phone: "33 8765 4321"
            }
        ]
    },
    {
        region: "Ciudad de México",
        stores: [
            {
                name: "BlueWave Store Polanco",
                ubication: "Calz. Gral. Mariano Escobedo 425, Chapultepec Morales, Polanco",
                schedule: "Lunes a Viernes 09:00 - 18:00",
                phone: "55 2345 6789"
            },
            {
                name: "BlueWave Store Santa Fe",
                ubication: "Centro Comercial Santa Fe",
                schedule: "Lunes a Domingo 11:00 - 21:00",
                phone: "55 9876 5432"
            }
        ]
    },
    {
        region: "Monterrey, Nuevo León",
        stores: [
            {
                name: "BlueWave Store San Pedro",
                ubication: "Av. Vasconcelos 210, San Pedro Garza García",
                schedule: "Lunes a Sábado 10:00 - 20:00",
                phone: "81 3456 7890"
            },
            {
                name: "BlueWave Store San Agustín",
                ubication: "Plaza Fiesta San Agustín",
                schedule: "Lunes a Domingo 11:00 - 21:00",
                phone: "81 6543 2109"
            }
        ]
    },
    {
        region: "Mérida, Yucatán",
        stores: [
            {
                name: "BlueWave Store Paseo de Montejo",
                ubication: "Paseo de Montejo 310, Centro",
                schedule: "Lunes a Viernes 09:00 - 17:00",
                phone: "99 9123 4567"
            },
            {
                name: "BlueWave Store La Isla",
                ubication: "La Isla Mérida, Cabo Norte",
                schedule: "Lunes a Domingo 11:00 - 21:00",
                phone: "99 9765 4321"
            }
        ]
    }
]

type TFrequentlyQuestion = {
    question: string
    answer: string
}

export const frequentlyQuestions: TFrequentlyQuestion[] = [
    {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer:
            "El tiempo de entrega depende de tu ubicación. Generalmente los envíos nacionales tardan entre 3 y 7 días hábiles."
    },
    {
        question: "¿Cuáles son los métodos de pago disponibles?",
        answer:
            "Aceptamos pagos con tarjeta de crédito, débito, transferencias bancarias y plataformas de pago seguras como Stripe y PayPal."
    },
    {
        question: "¿Puedo cambiar o devolver un producto?",
        answer:
            "Sí, puedes solicitar cambios o devoluciones dentro de los primeros 30 días después de recibir tu pedido, siempre que el producto esté en perfectas condiciones."
    },
    {
        question: "¿Cómo puedo rastrear mi pedido?",
        answer:
            "Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de guía para que puedas rastrear tu paquete en tiempo real."
    },
    {
        question: "¿Qué hago si mi pedido llegó dañado o incompleto?",
        answer:
            "Si tu pedido llegó con algún inconveniente, contáctanos de inmediato a nuestro equipo de soporte para ayudarte a resolverlo lo antes posible."
    },
    {
        question: "¿Es seguro comprar en su tienda en línea?",
        answer:
            "Sí, contamos con certificados de seguridad y utilizamos tecnología de encriptación para proteger tus datos personales y de pago."
    }
]


type TMenuProfileItems = {
    id: string,
    label: string
    icon: LucideIcon,
    to: string
}
export const menuItems : TMenuProfileItems[] = [
    {
        id: "personal",
        label: "Información personal",
        icon: User,
        to: "/perfil/informacion"
    },
    {
        id: "address",
        label: "Dirección",
        icon: MapPin,
        to: "/perfil/direccion"
    },
    {
        id: "favorites",
        label: "Favoritos",
        icon: Heart,
        to: "/perfil/favoritos"
    },
    {
        id: "purchases",
        label: "Mis compras",
        icon: ShoppingBag,
        to: "/perfil/mis-compras"
    },
    {
        id: "privacy",
        label: "Aviso de privacidad",
        icon: Shield,
        to: "/perfil/privacidad"
    },
    {
        id: "terms",
        label: "Términos y condiciones",
        icon: FileText,
        to: "/perfil/terminos"
    },
];