import type { Lang } from "./i18n";

const translations = {
  es: {
    global: {
      ecosistema: "Ecosistema",
      langBtn: "English",
      backHome: "Inicio",
    },

    landing: {
      nav: { signIn: "Iniciar sesion", scheduleDemo: "Agendar demo" },
      hero: {
        pill: "ECOSISTEMA DIGITAL PARA NEGOCIOS",
        title1: "Tu negocio merece",
        title2: "mas que una pagina",
        body: "Conect-R es la infraestructura operativa que atrae, atiende y retiene a tus clientes — todo en un solo ecosistema diseñado para negocios.",
        ctaPrimary: "Agenda tu demo gratis",
        ctaSecondary: "Ver funciones",
      },
      about: {
        pill: "RESUMEN EJECUTIVO",
        title1: "Mas que software.",
        title2: "Un ecosistema operativo.",
        body: "Conect-R es un ecosistema tecnologico integral disenado para revolucionar las operaciones y la experiencia del usuario en la industria restaurantera. Modelo hibrido de Hardware y Software como Servicio (SaaS) que integra soluciones fragmentadas en un solo paquete cohesivo — eliminando la necesidad de multiples proveedores de tecnologia y reduciendo la friccion operativa.",
        vision: { label: "Vision", body: "Ser el sistema operativo definitivo y mas estetico para la gestion integral de restaurantes." },
        mission: { label: "Mision", body: "Proveer herramientas visuales premium, intuitivas, de implementacion rapida y con altos estandares de seguridad — para que los duenos puedan enfocarse exclusivamente en crecer y en la hospitalidad." },
      },
      ecosystem: {
        pill: "PORTAFOLIO DE APLICACIONES",
        title1: "Cada modulo,",
        title2: "una solucion critica.",
        body: "Cada producto del suite Conect-R esta disenado independientemente para resolver una necesidad critica de operacion, manteniendo cohesion visual y funcional inigualable.",
      },
      appPortfolio: [
        {
          name: "Premium Website",
          tagline: "EL ESCAPARATE DIGITAL DE LA MARCA",
          body: "No es un sitio estatico — es una infraestructura interactiva con diseno avanzado de marca. Estetica moderna (glassmorphism, micro-animaciones) que garantiza un wow-factor real. Integra mejores practicas de SEO tecnico (tags, semantica HTML, velocidad de carga) para impulsar visibilidad en buscadores. Cada sitio incluye un conserje de IA integrado que responde a las preguntas de los clientes las 24 horas, los 7 días de la semana, los guía para realizar pedidos o reservar una mesa — reduciendo la carga de trabajo de su personal y propietarios.",
          dashHash: "presencia",
        },
        {
          name: "Chamba",
          tagline: "CONTROL TOTAL DEL BACK OFFICE",
          body: "Plataforma especializada en la gestion administrativa: Personal y Mano de Obra (turnos), Control de Inventario (insumos, recetas, costos, mermas) y Payroll (calculo de horas trabajadas y distribucion de propinas).",
          dashHash: "gestion",
        },
        {
          name: "Table Reserve",
          tagline: "GESTION DE MESAS SIN FRICCION",
          body: "Sistema automatizado de reservas que facilita al cliente apartar su mesa online, optimiza la capacidad del restaurante, evita el sobrecupo y captura datos valiosos de comportamiento y preferencias del cliente.",
          dashHash: "gestion",
        },
        {
          name: "NextUp",
          tagline: "LA EVOLUCION DE LAS FILAS DE ESPERA",
          body: "Lista de espera digital sincronizada. Los comensales se registran y reciben avisos del turno directamente en su celular — elimina las filas en la entrada, optimiza la rotacion de mesas y mejora la experiencia antes de sentarse.",
          dashHash: "gestion",
        },
        {
          name: "Conect-r Station",
          tagline: "VENDE MÁS, PAGA MENOS COMISIÓN",
          body: "El panel completo para tu negocio de comida: pedidos y pagos directo desde la mesa —con stands NFC elegantes o códigos QR—, reservas de eventos 24/7, y un solo link con tu menú, tus redes sociales y tus apps de delivery, para que dejes de regalarle comisión a terceros.",
          dashHash: "smart-table",
        },
        {
          name: "TV Menu Boards",
          tagline: "PANTALLAS DINAMICAS EN SITIO",
          body: "Sistemas de pantallas digitales colocadas estrategicamente en el establecimiento (barras o zonas de comida rapida). Muestran menu, videos promocionales y especiales de manera atractiva y dinamica — empujando ventas visualmente.",
          dashHash: "signage",
        },
        {
          name: "Asesoria para Negocios",
          tagline: "CONSULTORIA ESTRATEGICA PARA RESTAURANTES",
          body: "Acompanamos a tu restaurante mas alla del software: analisis operativo, estrategia de marketing, recomendaciones de menu, optimizacion de costos y plan de crecimiento. Conect-R como tu socio estrategico — no solo proveedor de tecnologia.",
          dashHash: "consulting",
        },
        {
          name: "Chop Chop",
          tagline: "PARA BARBERÍAS Y SALONES",
          body: "Plataforma de reservas para barberías y salones. Tus clientes eligen su estilista, solicitan su horario y tú apruebas la cita desde tu celular — sin llamadas, sin mensajes perdidos, sin confusión.",
          dashHash: "chop-chop",
        },
      ],
      flow: {
        pill: "ASI FUNCIONA",
        title1: "De Conect-r Station",
        title2: "a la reseña de 5 estrellas",
        body: "Todo en un flujo continuo y automatico.",
        steps: [
          { num: "01", title: "El cliente toca la Conect-r Station", body: "Sin app, sin descargar nada. Solo acerca el celular al stand de la mesa." },
          { num: "02", title: "Se abre el portal del restaurante", body: "Menu, reservas, redes sociales y reseñas — todo en una sola pantalla." },
          { num: "03", title: "Deja una reseña de 5 estrellas en Google", body: "El sistema lo guia con un solo tap. Mas reviews = mas clientes nuevos." },
          { num: "04", title: "Tu restaurante crece sin esfuerzo", body: "Mas rankings en Google, mas reservas, mas mesas llenas. Todo automatico." },
        ],
      },
      local: {
        pill: "HECHO EN CALIFORNIA",
        title1: "Compañia local de Sacramento",
        title2: "para restaurantes locales",
        body: "Conect-R es una compañia local de California, basada en Sacramento. Servimos principalmente a restaurantes de Sacramento y sus alrededores — Elk Grove, Roseville, Folsom, Davis, Rocklin y toda la region. Conocemos el mercado local, hablamos tu idioma y entendemos las necesidades de los restaurantes familiares mexicanos, latinos y americanos.",
        cities: ["Sacramento", "Elk Grove", "Roseville", "Folsom", "Davis", "Rocklin"],
      },
      expansion: {
        pill: "ESCALA NACIONAL",
        title1: "Expansion agresiva",
        title2: "en Estados Unidos",
        body: "Nuestro objetivo a mediano y largo plazo es la expansion agresiva y la venta online en todo Estados Unidos. El modelo SaaS y el envio de hardware preconfigurado (como Conect-r Station) nos permite operar de forma remota, eliminando las barreras geograficas que tradicionalmente limitan a las agencias locales.",
        items: [
          { title: "Estandarizacion *Plug & Play*", body: "Sin POS propietario ni hardware on-premise. Los modulos (Website, Chamba, Table Reserve, NextUp) se activan remotamente para cualquier restaurante en USA en cuestion de horas." },
          { title: "Marketing de Impacto Visual", body: "Campañas digitales con disenos premium y dinamicos que garantizan un wow-factor. Las landing pages convierten sin necesidad de visitas presenciales." },
          { title: "Escalabilidad por Bundle", body: "Promover el Ecosistema Completo aumenta el ticket promedio (LTV) mientras el restaurante hace su transformacion digital con una inversion accesible." },
          { title: "Portafolio Publico Autorizado", body: "Por contrato, Conect-R puede usar logos y casos de exito de clientes como material publicitario (Social Proof) — construyendo credibilidad estado por estado." },
        ],
      },
      legal: {
        pill: "MARCO LEGAL",
        title: "Diseno legal que protege a ambos lados",
        body: "Master Terms, Specifications & Services Agreement estructurado cuidadosamente para proteger los activos de la empresa y dar tranquilidad al cliente.",
        items: [
          { title: "Propiedad Intelectual y Codigo", body: "Conect-R retiene exclusiva y permanentemente todos los derechos sobre la infraestructura online, codigo fuente, bases de datos y algoritmos." },
          { title: "Licencia Restringida", body: "El cliente paga una licencia limitada, no exclusiva y no transferible. La propiedad del hardware fisico (stands) no transfiere derechos sobre el software." },
          { title: "Confidencialidad Estricta", body: "Compromiso firme de proteger los datos operativos del restaurante y la base de datos de clientes. Conect-R no vende ni distribuye estos datos a terceros." },
          { title: "Disclaimer", body: "El ecosistema se provee 'as is', protegiendo a Conect-R de reclamos por perdida de utilidades o interrupciones imprevisibles del servicio (downtime)." },
        ],
      },
      finalCta: {
        title: "¿Listo para llenar mas mesas?",
        body: "Agenda una demo de 30 minutos. Sin compromisos. Te mostramos el ecosistema en accion para tu restaurante.",
        whatsapp: "Reservar por WhatsApp",
        email: "Enviar email",
      },
      footer: {
        tagline: "Ecosistema digital para restaurantes. Atrae, atiende y retiene a tus clientes.",
        productLabel: "Producto",
        productLinks: [
          { label: "Contacto", href: "mailto:contact@conect-r.com" },
        ],
        location: "Sacramento, California",
        copy: "© 2026 Conect-R. Hecho con orgullo local.",
      },
    },


    consulting: {
      description:
        "Analizamos tu restaurante a fondo y aplicamos optimizaciones medibles para que cada mesa, cada platillo y cada turno generen más utilidad.",
      steps: [
        { title: "Diagnóstico Operativo", body: "Estudio de ventas, costos, tiempos de servicio, mermas, rotación de mesas y datos del POS para detectar dónde se va el dinero." },
        { title: "Plan Estratégico", body: "Recomendaciones concretas: ajuste de menú, ingeniería de precios, reorganización de turnos, propinas, marketing local y digitalización." },
        { title: "Implementación Guiada", body: "Activamos los módulos Conect-R necesarios, capacitamos al equipo y dejamos procesos documentados para que la operación no dependa de una sola persona." },
        { title: "Medición de Utilidad", body: "Tablero mensual con KPIs: ticket promedio, food cost %, labor %, ocupación y utilidad neta — comparativo antes vs. después." },
      ],
      metrics: [
        { value: "+28%", label: "Utilidad neta promedio" },
        { value: "-18%", label: "Food cost después de ingeniería de menú" },
        { value: "+34%", label: "Ticket promedio en horarios optimizados" },
      ],
    },







    premiumWebsite: {
      hero: {
        pill: "SITIO WEB PREMIUM",
        title: "Tu hogar digital,",
        titleHighlight: "diseñado para vender.",
        subtitle: "No es una plantilla. No es un sitio básico. Una presencia web premium e interactiva creada específicamente para tu restaurante — con reservas, menú y SEO integrados desde el primer día.",
        cta: "Solicitar mi sitio",
      },
      quote: {
        pill: "COTIZACIÓN",
        title: "Cotización personalizada",
        body: "Cada negocio opera distinto. Cuéntanos qué necesitas y preparamos una propuesta a tu medida, sin compromiso.",
        cta: "Contáctanos para una cotización personalizada",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Diseño de marca premium",
            body: "Identidad visual personalizada construida alrededor de tu restaurante: colores, tipografía, diseños fotográficos y microanimaciones que garantizan un wow-factor real.",
          },
          {
            title: "Reservaciones en línea",
            body: "Flujo de reservas integrado que permite a los clientes reservar mesa en segundos, directamente desde tu sitio — sin comisiones a terceros, sin llamadas perdidas.",
          },
          {
            title: "Menú digital integrado",
            body: "Tu menú completo vive en el sitio: siempre actualizado, hermosamente diseñado y accesible desde cualquier dispositivo sin necesidad de descargar apps.",
          },
          {
            title: "Optimizado para SEO local",
            body: "SEO técnico integrado desde el primer día: HTML semántico, datos estructurados, carga rápida e integración con Google Business para destacar en búsquedas locales.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que un sitio web —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Diseñado para convertir, no solo para verse bien",
            body: "Cada sección — desde el hero hasta el menú — está diseñada con patrones de conversión probados que transforman visitantes en reservaciones.",
          },
          {
            title: "Entrega rápida, sin dolores de cabeza técnicos",
            body: "Proyecto completo al aire en menos de 2 semanas. Nos encargamos del hosting, actualizaciones y monitoreo de rendimiento para que te enfoques en operar tu restaurante.",
          },
          {
            title: "Tu marca, tu activo",
            body: "Es tuyo. El diseño, el contenido, el dominio. Lo construimos para durar y te entregamos el control completo sin ataduras.",
          },
          {
            title: "Probado para restaurantes locales",
            body: "Validado con restaurantes del área de Sacramento — conceptos mexicanos, americanos y latinos — que vieron incrementos medibles en clientes y reservaciones en línea.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "Construyamos la",
        titleHighlight: "mejor página de tu restaurante.",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con el equipo de Conect-R para comenzar.",
        button: "Solicitar mi sitio",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en nuestro sitio Premium! Soy Aria de Conect-R. Te guiaré para agendar tu consulta.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Me gustaría solicitar mi Sitio Web Premium",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    chamba: {
      hero: {
        pill: "CHAMBA",
        title: "Chamba",
        titleHighlight: "Software Todo en Uno para la Gestión de Restaurantes",
        subtitle: "Chamba es un software de gestión para restaurantes que centraliza toda tu operación en un solo programa. Se conecta a los principales sistemas POS y muestra tus ventas en tiempo real, optimiza tu personal con IA, procesa nóminas, controla inventarios y costos de alimentos, y te permite realizar pedidos directamente desde la aplicación a proveedores como US Foods, Sysco y más — sin tener que malabarear con cinco sistemas diferentes.",
        cta: "Activar Chamba",
      },
      quote: {
        pill: "COTIZACIÓN",
        title: "Cotización personalizada",
        body: "Cada negocio opera distinto. Cuéntanos qué necesitas y preparamos una propuesta a tu medida, sin compromiso.",
        cta: "Contáctanos para una cotización personalizada",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Conexión POS y ventas en vivo",
            body: "Conéctate directamente con los principales sistemas POS. Monitorea tus ventas y volumen de tickets en tiempo real desde cualquier lugar.",
          },
          {
            title: "Personal impulsado por IA",
            body: "Aprovecha modelos predictivos inteligentes para alinear los horarios del personal con las ventas esperadas, minimizando el desperdicio en costos laborales.",
          },
          {
            title: "Nómina automatizada",
            body: "Simplifica las auditorías de turnos, calcula salarios y procesa la nómina en un solo panel sin necesidad de hojas de cálculo externas.",
          },
          {
            title: "Control de inventario y costo de alimentos",
            body: "Mantén conteos de stock en vivo, monitorea los costos de productos y gestiona las porciones de recetas para proteger tu margen.",
          },
          {
            title: "Pedidos directos a proveedores",
            body: "Envía órdenes de compra directamente a distribuidores como US Foods, Sysco y proveedores locales desde la aplicación.",
          },
          {
            title: "Horarios, turnos y propinas",
            body: "Programa turnos con facilidad, registra las entradas y salidas de los trabajadores y distribuye las propinas de manera justa según las horas reales.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que software —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Todo en un solo programa",
            body: "Despídete de malabarear con cinco plataformas diferentes. POS, personal, nómina, inventario y compras unificados.",
          },
          {
            title: "Ventas en vivo desde tu teléfono",
            body: "Revisa el rendimiento de tu negocio en cualquier momento y lugar. Acceso instantáneo a números de ventas en tiempo real.",
          },
          {
            title: "IA que reduce horas desperdiciadas",
            body: "Optimiza la programación del personal. La IA analiza el historial y pronostica los horarios, ahorrando cientos de dólares al mes.",
          },
          {
            title: "Pedidos directos a los mejores proveedores",
            body: "Realiza pedidos a US Foods, Sysco y otros. Agiliza el reabastecimiento y minimiza los errores de entrada de datos.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "¿Listo para lanzar Chamba?",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con el equipo de Conect-R para comenzar.",
        button: "Activar Chamba",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en Chamba! Soy Aria de Conect-R. Te guiaré para activar Chamba.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Me gustaría activar Chamba",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    tableReserve: {
      hero: {
        pill: "TABLE RESERVE",
        title: "Table Reserve",
        titleHighlight: "Reservas automatizadas que llenan mesas",
        subtitle: "Table Reserve reemplaza el cuaderno de papel y las llamadas telefónicas. Tus clientes reservan 24/7 desde tu sitio web o redes sociales, recibes confirmaciones automáticas y tu recepcionista ve la ocupación del salón en tiempo real desde una tableta.",
        cta: "Probar Table Reserve",
      },
      quote: {
        pill: "COTIZACIÓN",
        title: "Cotización personalizada",
        body: "Cada negocio opera distinto. Cuéntanos qué necesitas y preparamos una propuesta a tu medida, sin compromiso.",
        cta: "Contáctanos para una cotización personalizada",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Reservas 24/7",
            body: "Los clientes reservan desde la web, Instagram, Google y WhatsApp — nadie tiene que contestar el teléfono.",
          },
          {
            title: "Panel de administración en vivo",
            body: "Tu recepcionista gestiona el salón desde una tableta: mesas, tiempos, ocupado/libre, sin usar papel.",
          },
          {
            title: "Confirmaciones automáticas",
            body: "Confirmación y recordatorio por SMS + correo electrónico — reduce los no-shows hasta en un 60%.",
          },
          {
            title: "Control de capacidad",
            body: "Define mesas por tamaño, franjas horarias por hora y bloquea espacios para eventos privados.",
          },
          {
            title: "Lista de espera integrada",
            body: "Sincronizada con NextUp para comensales sin reserva cuando el salón esté lleno.",
          },
          {
            title: "Reportes de ocupación",
            body: "Cuántas reservas, cuántas confirmadas, cuántos no-shows. Datos reales para tomar decisiones.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que software —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Hasta 60% menos no-shows",
            body: "Los recordatorios automáticos por SMS y correo electrónico animan a los clientes a confirmar o cancelar con antelación, manteniendo las mesas llenas.",
          },
          {
            title: "Integrado en tu sitio y Google",
            body: "Permite realizar reservas desde los resultados de búsqueda, mapas sociales y tu propio sitio web con widgets fluidos integrados.",
          },
          {
            title: "Sin comisión por reserva",
            body: "Cuota SaaS fija en lugar de altos cobros por comensal. Conserva el 100% de tus márgenes a diferencia de OpenTable.",
          },
          {
            title: "Soporte bilingüe en menos de 2 horas",
            body: "Equipo de soporte local que responde tanto en inglés como en español cuando necesitas ayuda en el salón.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "¿Listo para lanzar Table Reserve?",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con el equipo de Conect-R para comenzar.",
        button: "Probar Table Reserve",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en Table Reserve! Soy Aria de Conect-R. Te guiaré para configurar tu prueba.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Me gustaría probar Table Reserve",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    nextUp: {
      hero: {
        pill: "NEXTUP",
        title: "NextUp",
        titleHighlight: "Lista de espera digital sincronizada",
        subtitle: "Se acabaron los localizadores físicos y la gente esperando en la puerta. NextUp permite a tus clientes registrarse desde su teléfono, pasear por los alrededores y recibir un SMS cuando su mesa esté lista.",
        cta: "Activar NextUp",
      },
      quote: {
        pill: "COTIZACIÓN",
        title: "Cotización personalizada",
        body: "Cada negocio opera distinto. Cuéntanos qué necesitas y preparamos una propuesta a tu medida, sin compromiso.",
        cta: "Contáctanos para una cotización personalizada",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Registro desde el teléfono",
            body: "QR en la puerta. El cliente lo escanea, escribe su nombre y el tamaño del grupo. Listo.",
          },
          {
            title: "Notificaciones SMS",
            body: "Avisos de turno, mesa lista y recordatorios — sin necesidad de descargar apps.",
          },
          {
            title: "Tiempo de espera estimado",
            body: "Calculado automáticamente en función del ritmo de rotación real de tu restaurante.",
          },
          {
            title: "Sincronizado con Table Reserve",
            body: "Reservas y clientes sin cita previa en la misma vista de administración.",
          },
          {
            title: "Pantalla pública",
            body: "Muestra los siguientes 10 grupos en una TV — los clientes ven que su turno se acerca.",
          },
          {
            title: "Base de datos de clientes",
            body: "Captura correos electrónicos/teléfonos para remarketing y boletines informativos con su consentimiento.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que software —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Reduce el abandono de la fila hasta un 35%",
            body: "Los comensales no tienen que esperar parados en la puerta. Pueden pasear, tomar algo y volver cuando reciban el mensaje de texto.",
          },
          {
            title: "Sin apps — funciona vía web/SMS",
            body: "Cero descargas requeridas para los clientes. Funciona instantáneamente en cualquier navegador móvil y a través de SMS.",
          },
          {
            title: "Integrado con Table Reserve",
            body: "Combina tu lista de espera activa y las reservaciones programadas en un solo panel de control para el recepcionista.",
          },
          {
            title: "Crea una base de datos de clientes",
            body: "Haz crecer tu lista de lealtad de forma natural capturando números de teléfono y correos electrónicos al registrarse.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "¿Listo para lanzar NextUp?",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con el equipo de Conect-R para comenzar.",
        button: "Activar NextUp",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en NextUp! Soy Aria de Conect-R. Te guiaré para activar tu lista de espera digital.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Me gustaría activar NextUp",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    chopChop: {
      hero: {
        pill: "CHOP CHOP",
        title: "Chop Chop",
        titleHighlight: "Gana más. Trabaja menos.",
        subtitle: "Chop Chop es la plataforma de reservas de Conect-R diseñada para barberías y salones. Tus clientes eligen su estilista, solicitan su horario y tú apruebas la cita desde tu celular — sin llamadas, sin mensajes perdidos, sin confusión.",
      },
      features: {
        pill: "QUÉ HACE",
        title: "Tu agenda,",
        titleHighlight: "en piloto automático.",
        list: [
          {
            title: "Reservas en 3 pasos",
            body: "El cliente elige su estilista, pide un horario y tú apruebas. Así de simple.",
          },
          {
            title: "Perfil profesional",
            body: "Cada estilista tiene su propio perfil con foto, especialidad y ubicación para que los clientes lo encuentren fácil.",
          },
          {
            title: "Agenda desde tu celular",
            body: "Administra tus citas donde estés, sin necesidad de estar pegado al teléfono.",
          },
          {
            title: "Soporte bilingüe",
            body: "Atiende a más clientes en español e inglés, sin barreras.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ TE CONVIENE",
        title: "Menos llamadas,",
        titleHighlight: "más citas.",
        list: [
          {
            title: "Ahorra tiempo",
            body: "Deja de contestar llamadas y mensajes solo para agendar citas. El sistema lo hace por ti, todo el día.",
          },
          {
            title: "Más citas, más ingresos",
            body: "Un proceso de reserva fácil significa menos clientes perdidos y más citas confirmadas cada semana.",
          },
          {
            title: "Haz crecer tu cartera de clientes",
            body: "Que te encuentren y reserven contigo directamente, a cualquier hora, incluso cuando tienes las manos ocupadas.",
          },
          {
            title: "Menos citas fantasma",
            body: "El sistema de aprobación reduce las cancelaciones de último momento y los espacios vacíos en tu agenda.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA EMPEZAR",
        title: "¿Listo para generar más y trabajar menos?",
        subtitle: "Únete a Chop Chop y deja que la plataforma se encargue de tus reservas mientras tú te enfocas en tu trabajo.",
        button: "Consigue Chop Chop",
        backToHome: "Volver al inicio",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu barbería o salón?",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    tvMenuBoards: {
      hero: {
        pill: "TV MENU BOARDS",
        title: "TV Menu Boards",
        titleHighlight: "Pantallas digitales que gestionamos por ti",
        subtitle: "Olvídate de imprimir menús nuevos cada temporada. Nuestras pantallas rotan eventos, menús con fotos y precios, y promociones animadas — todo gestionado por Conect-R. Envías un mensaje, nosotros actualizamos.",
        cta: "Activar Pantallas TV",
      },
      quote: {
        pill: "COTIZACIÓN",
        title: "Cotización personalizada",
        body: "Cada negocio opera distinto. Cuéntanos qué necesitas y preparamos una propuesta a tu medida, sin compromiso.",
        cta: "Contáctanos para una cotización personalizada",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Rotación automática",
            body: "Eventos, menús con fotos y precios, promos animadas — todo cicla automáticamente cada pocos segundos.",
          },
          {
            title: "Actualizaciones por WhatsApp",
            body: "Nos envías un mensaje y cambiamos el contenido de todas tus pantallas en cuestión de minutos.",
          },
          {
            title: "Plantillas premium",
            body: "Diseño profesional listo para usar — Taco Tuesday, Happy Hour, Brunch, eventos especiales.",
          },
          {
            title: "Contenido animado",
            body: "Promociones con movimiento que captan mucha más atención que los letreros impresos estáticos.",
          },
          {
            title: "Sin técnicos en sitio",
            body: "Todo se actualiza desde la nube. Nadie tiene que manipular físicamente los televisores.",
          },
          {
            title: "Multi-pantalla",
            body: "Contenido diferente para cada área: barra, terraza, salón — todo controlado desde una sola consola.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que software —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Instalación en una sola visita",
            body: "Nuestro técnico instala y prueba todo en una sola visita, para que estés listo y operando inmediatamente.",
          },
          {
            title: "Contenido actualizado en minutos",
            body: "Envía un mensaje por WhatsApp y nuestros diseñadores desplegarán las actualizaciones en todas tus pantallas al instante.",
          },
          {
            title: "Sin software que aprender",
            body: "Cero curva de aprendizaje para ti o tu personal. Nosotros nos encargamos de todo el diseño y la gestión tecnológica.",
          },
          {
            title: "Reemplaza menús y letreros impresos",
            body: "Elimina los costos repetitivos de impresión y mantén tus precios y platillos dinámicos y actualizados.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "¿Listo para lanzar TV Menu Boards?",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con el equipo de Conect-R para activar tus pantallas de menú de TV.",
        button: "Activar Pantallas TV",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en TV Menu Boards! Soy Aria de Conect-R. Te guiaré para configurar tus pantallas digitales.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Me gustaría activar las Pantallas de Menú TV",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    businessConsulting: {
      hero: {
        pill: "ASESORÍA DE NEGOCIOS",
        title: "Asesoría de Negocios",
        titleHighlight: "Más utilidad, menos conjeturas.",
        subtitle: "Analizamos tu restaurante a fondo y aplicamos optimizaciones medibles para que cada mesa, cada platillo y cada turno generen más utilidad.",
        cta: "Quiero un diagnóstico gratuito",
      },
      stats: {
        pill: "RESULTADOS PROBADOS",
        title: "Estudios que se convierten en dinero real",
        subtitle: "Entregamos mejoras financieras concretas a través de rediseños operativos basados en datos.",
        metrics: [
          {
            value: "+28%",
            label: "Aumento promedio de utilidad neta",
          },
          {
            value: "-18%",
            label: "Costo de alimentos tras ingeniería de menú",
          },
          {
            value: "+34%",
            label: "Ticket promedio en horarios optimizados",
          },
        ],
      },
      features: {
        pill: "NUESTRO MÉTODO",
        title: "Una hoja de ruta estructurada para",
        titleHighlight: "maximizar la eficiencia.",
        list: [
          {
            number: "01",
            title: "Diagnóstico Operativo",
            body: "Estudio profundo de ventas, costos, tiempos de servicio, desperdicio, rotación de mesas y datos del POS — identificando exactamente dónde se escapa el dinero.",
          },
          {
            number: "02",
            title: "Plan Estratégico",
            body: "Recomendaciones concretas: reingeniería de menús, estrategia de precios, rediseño de turnos, política de propinas, marketing local y activación digital.",
          },
          {
            number: "03",
            title: "Implementación Guiada",
            body: "Activamos los módulos de Conect-R que necesitas, capacitamos al equipo y dejamos procesos documentados para que el negocio ya no dependa de una sola persona.",
          },
          {
            number: "04",
            title: "Medición de Beneficios",
            body: "Panel mensual de KPIs: ticket promedio, % de costo de comida, % de labor, ocupación y utilidad neta — comparación clara del antes vs. después.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA OPTIMIZAR",
        title: "¿Listo para optimizar tu restaurante?",
        subtitle: "Habla con Aria — nuestra asistente virtual recopilará tus detalles y te conectará con nuestro equipo de consultoría para comenzar.",
        button: "Quiero un diagnóstico gratuito",
        backToHome: "Volver al inicio",
        socialProof: [
          "Términos flexibles",
          "Proyecto completo al aire en menos de 2 semanas",
          "Soporte bilingüe (EN/ES)",
          "Equipo basado en Sacramento",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en nuestra Asesoría de Negocios! Soy Aria de Conect-R. Te guiaré para programar tu diagnóstico gratuito.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      chatUserMessage: "Quiero un diagnóstico gratuito",
      demoUserMessage: "Me gustaría agendar una demo",
    },
    conectrStation: {
      hero: {
        pill: "CONECT-R STATION",
        title: "Conect-r Station",
        titleHighlight: "Vende más. Paga menos comisión.",
        subtitle: "El panel completo para restaurantes, food trucks y negocios de catering: pedidos y pagos desde la mesa, reservas de eventos las 24 horas, y un solo link con tu menú, tus redes sociales y tus apps de delivery — accesible con un stand NFC elegante o un código QR, como tú prefieras.",
        cta: "Crea tu cuenta gratis",
      },
      support: {
        pill: "SOPORTE TÉCNICO",
        title: "Soporte técnico, las 24 horas",
        body: "¿Tienes dudas sobre cómo usar Station, o necesitas ayuda para resolver un problema? Escríbenos por mensaje de texto — te respondemos en español o inglés, cualquier día, a cualquier hora.",
        button: "Envíanos un mensaje",
        smsBody: "Necesito ayuda con Station",
      },
      features: {
        pill: "QUÉ ESTÁ INCLUIDO",
        title: "Todo lo que necesitas,",
        titleHighlight: "nada de lo que no.",
        list: [
          {
            title: "Elige cómo acceden tus clientes",
            body: "Stands NFC elegantes para un toque moderno, o códigos QR: Station te genera un flyer editable con tu código, más QR chicos con el número de cada mesa, listos para imprimir.",
          },
          {
            title: "Pedidos y pagos desde la mesa",
            body: "El cliente ordena y paga desde su celular; la orden llega directo a la cocina, sin errores.",
          },
          {
            title: "Reservas de eventos 24/7",
            body: "Recibe solicitudes de catering con depósito cobrado, aunque tu negocio esté cerrado.",
          },
          {
            title: "Ubicación en tiempo real",
            body: "Ideal para food trucks y puestos: tus clientes siempre saben dónde encontrarte hoy.",
          },
        ],
      },
      whyUs: {
        pill: "POR QUÉ NOS ELIGEN",
        title: "Más que software —",
        titleHighlight: "un motor de crecimiento.",
        list: [
          {
            title: "Deja de regalar comisión",
            body: "Cada pedido que te llega por tu link o QR es dinero que no le das a DoorDash o Uber Eats.",
          },
          {
            title: "Tus meseros atienden, no toman notas",
            body: "En hora pico, la orden llega sola a la cocina. Menos errores, menos presión.",
          },
          {
            title: "No pierdas ni un evento",
            body: "Te llegan las reservas con el depósito ya pagado, aunque no hayas contestado el teléfono.",
          },
          {
            title: "Cambia tu menú en segundos",
            body: "Sube un precio o agrega un platillo nuevo desde tu celular. Sin reimprimir nada.",
          },
        ],
      },
      cta: {
        pill: "LISTO PARA LANZAR",
        title: "¿Listo para vender más y pagar menos comisión?",
        subtitle: "Prueba Conect-r Station y deja que la plataforma se encargue de tus pedidos, tus pagos y tu presencia en línea, mientras tú te enfocas en cocinar.",
        button: "Crea tu cuenta gratis",
        backToHome: "Volver al inicio",
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. Todos los derechos reservados.",
      },
      demoGreeting: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
      chatGreeting: "¡Gracias por tu interés en Conect-r Station! Soy Aria de Conect-R. Te guiaré para ordenar tu estación.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?",
      signupNote: "Primer mes gratis. Después, $100/mes si quieres aceptar Venmo, Cash App y tarjeta — o gratis si tus clientes pagan directo por Station.",
      chatUserMessage: "Me gustaría ordenar mi Conect-r Station",
      demoUserMessage: "Me gustaría agendar una demo",
    },
  },

  en: {
    global: {
      ecosistema: "Ecosystem",
      langBtn: "Español",
      backHome: "Home",
    },

    landing: {
      nav: { signIn: "Sign in", scheduleDemo: "Book a demo" },
      hero: {
        pill: "DIGITAL ECOSYSTEM FOR BUSINESSES",
        title1: "Your business deserves",
        title2: "more than a webpage",
        body: "Conect-R is the operational infrastructure that attracts, serves, and retains your customers — all in one ecosystem built for businesses.",
        ctaPrimary: "Book your free demo",
        ctaSecondary: "See features",
      },
      about: {
        pill: "EXECUTIVE SUMMARY",
        title1: "More than software.",
        title2: "An operating ecosystem.",
        body: "Conect-R is a comprehensive technology ecosystem designed to revolutionize operations and user experience in the restaurant industry. A hybrid Hardware + Software-as-a-Service (SaaS) model that integrates fragmented solutions into a single cohesive package — eliminating the need for multiple technology providers and reducing operational friction.",
        vision: { label: "Vision", body: "To be the ultimate, aesthetically pleasing operating system for the comprehensive management of restaurants." },
        mission: { label: "Mission", body: "Provide premium, intuitive, quick-to-implement visual tools with high security standards — so owners can focus exclusively on growth and hospitality." },
      },
      ecosystem: {
        pill: "APPLICATION PORTFOLIO",
        title1: "Each module,",
        title2: "a critical solution.",
        body: "Every product in the Conect-R suite is independently designed to solve a critical restaurant operation need, while maintaining unparalleled visual and functional cohesion.",
      },
      appPortfolio: [
        {
          name: "Premium Website",
          tagline: "THE BRAND'S DIGITAL SHOWCASE",
          body: "Not a static website — an interactive infrastructure with advanced brand design. Modern aesthetics (glassmorphism, micro-animations) that guarantee a true wow-factor. Best practices for technical SEO (tags, HTML semantics, page load speed) to boost search visibility. Every site includes a built-in AI concierge that answers customer questions 24/7, guides them to place orders or book a table — reducing the workload on your staff and owners.",
          dashHash: "presencia",
        },
        {
          name: "Chamba",
          tagline: "FULL CONTROL OF THE BACK OFFICE",
          body: "Platform specializing in administrative management: Staff and Labor (schedules and shifts), Inventory Control (supplies, recipes, costs, waste reduction), and Payroll (calculation of hours worked and tip distribution).",
          dashHash: "gestion",
        },
        {
          name: "Table Reserve",
          tagline: "FRICTIONLESS TABLE MANAGEMENT",
          body: "Our automated reservation system makes it easy for customers to secure their table online, while allowing the restaurant to optimize capacity, prevent overbooking, and collect valuable customer behavior and preference data.",
          dashHash: "gestion",
        },
        {
          name: "NextUp",
          tagline: "THE EVOLUTION OF WAITING LINES",
          body: "Smart, digitally synchronized waitlist. Diners register and receive updates about their turn directly on their phones — eliminating entrance congestion, optimizing table turnover, and improving the user experience before they're seated.",
          dashHash: "gestion",
        },
        {
          name: "Conect-r Station",
          tagline: "SELL MORE, PAY LESS COMMISSION",
          body: "The complete dashboard for your food business: ordering and payment straight from the table —with sleek NFC stands or QR codes—, 24/7 event bookings, and one link with your menu, social media, and delivery apps, so you stop giving away commission to third parties.",
          dashHash: "smart-table",
        },
        {
          name: "TV Menu Boards",
          tagline: "DYNAMIC ON-SCREEN MENUS",
          body: "Digital screen systems strategically placed in the establishment (bars or fast-food areas). They display menus, promotional videos, and specials in an attractive and dynamic way — visually boosting sales.",
          dashHash: "signage",
        },
        {
          name: "Business Consulting",
          tagline: "STRATEGIC ADVISORY FOR RESTAURANTS",
          body: "We support your restaurant beyond the software: operational analysis, marketing strategy, menu recommendations, cost optimization, and growth planning. Conect-R as your strategic partner — not just a technology vendor.",
          dashHash: "consulting",
        },
        {
          name: "Chop Chop",
          tagline: "FOR BARBERSHOPS & SALONS",
          body: "Booking platform for barbershops and salons. Clients pick their stylist, request a time, and you approve the appointment right from your phone — no calls, no missed messages, no back-and-forth.",
          dashHash: "chop-chop",
        },
      ],
      flow: {
        pill: "HOW IT WORKS",
        title1: "From Conect-r Station",
        title2: "to a 5-star review",
        body: "All in one continuous, automatic flow.",
        steps: [
          { num: "01", title: "Customer taps Conect-r Station", body: "No app, no downloads. Just tap the phone on the table stand." },
          { num: "02", title: "The restaurant portal opens", body: "Menu, reservations, social media and reviews — all on one screen." },
          { num: "03", title: "Leaves a 5-star Google review", body: "The system guides them with one tap. More reviews = more new customers." },
          { num: "04", title: "Your restaurant grows effortlessly", body: "Higher Google rankings, more reservations, more full tables. All automatic." },
        ],
      },
      local: {
        pill: "MADE IN CALIFORNIA",
        title1: "A local Sacramento company",
        title2: "for local restaurants",
        body: "Conect-R is a local California company based in Sacramento. We primarily serve restaurants in Sacramento and surrounding areas — Elk Grove, Roseville, Folsom, Davis, Rocklin and the entire region. We know the local market, we speak your language, and we understand the needs of family-owned Mexican, Latin, and American restaurants.",
        cities: ["Sacramento", "Elk Grove", "Roseville", "Folsom", "Davis", "Rocklin"],
      },
      expansion: {
        pill: "NATIONAL SCALE",
        title1: "Aggressive expansion",
        title2: "across the United States",
        body: "Our medium- and long-term goal is aggressive expansion and online sales across the United States. The SaaS model and shipment of pre-configured hardware (such as Conect-r Station) lets us operate remotely, eliminating the geographical barriers that traditionally limit local agencies.",
        items: [
          { title: "*Plug & Play* Standardization", body: "No proprietary POS or on-premise hardware required. Modules (Website, Chamba, Table Reserve, NextUp) activate remotely for any restaurant in the USA in a matter of hours." },
          { title: "Visual Impact Marketing", body: "Premium and dynamic digital campaigns that guarantee a wow-factor. Landing pages convert without the need for in-person sales visits." },
          { title: "Bundle Scalability", body: "Promoting the Complete Ecosystem raises the average ticket (LTV) while the restaurant goes through a full digital transformation with an accessible investment." },
          { title: "Authorized Public Portfolio", body: "By contract, Conect-R can use customer logos and success stories as marketing material (Social Proof) — building credibility state by state." },
        ],
      },
      legal: {
        pill: "LEGAL FRAMEWORK",
        title: "Legal design that protects both sides",
        body: "Master Terms, Specifications & Services Agreement carefully structured to protect company assets and ensure customer peace of mind.",
        items: [
          { title: "Intellectual Property and Code", body: "Conect-R exclusively and permanently retains all rights to the online infrastructure, source code, databases, and algorithms." },
          { title: "Restricted Licensing", body: "The customer pays for a limited, non-exclusive, non-transferable license. Ownership of the physical hardware (stands) does not transfer software IP rights." },
          { title: "Strict Confidentiality", body: "Strong commitment to protecting the restaurant's operational data and customer database. Conect-R does not sell or distribute this data to third parties." },
          { title: "Disclaimer", body: "The ecosystem is provided 'as is', protecting Conect-R from claims of lost profits or unforeseeable service interruptions (downtime)." },
        ],
      },
      finalCta: {
        title: "Ready to fill more tables?",
        body: "Book a 30-minute demo. No commitments. We'll show you the ecosystem in action for your restaurant.",
        whatsapp: "Book by WhatsApp",
        email: "Send email",
      },
      footer: {
        tagline: "Digital ecosystem for restaurants. Attract, serve, and retain your customers.",
        productLabel: "Product",
        productLinks: [
          { label: "Contact", href: "mailto:contact@conect-r.com" },
        ],
        location: "Sacramento, California",
        copy: "© 2026 Conect-R. Made with local pride.",
      },
    },


    consulting: {
      description:
        "We analyze your restaurant in depth and roll out measurable optimizations so every table, every dish and every shift drives more profit.",
      steps: [
        { title: "Operational Diagnosis", body: "Deep study of sales, costs, service times, waste, table turnover and POS data — pinpointing exactly where money is leaking." },
        { title: "Strategic Plan", body: "Concrete recommendations: menu re-engineering, price strategy, shift redesign, tip policy, local marketing and digital activation." },
        { title: "Guided Implementation", body: "We activate the Conect-R modules you need, train the team and leave processes documented so the business no longer depends on one person." },
        { title: "Profit Measurement", body: "Monthly KPI dashboard: average check, food cost %, labor %, occupancy and net profit — clear before vs. after comparison." },
      ],
      metrics: [
        { value: "+28%", label: "Average net profit lift" },
        { value: "-18%", label: "Food cost after menu engineering" },
        { value: "+34%", label: "Average ticket in optimized hours" },
      ],
    },







    premiumWebsite: {
      hero: {
        pill: "PREMIUM WEBSITE",
        title: "Your digital home,",
        titleHighlight: "built to sell.",
        subtitle: "Not a template. Not a basic site. A premium, interactive web presence built specifically for your restaurant — with reservations, menu, and SEO baked in from day one.",
        cta: "Request my site",
      },
      quote: {
        pill: "GET A QUOTE",
        title: "Personalized quote",
        body: "Every business runs differently. Tell us what you need and we'll put together a proposal tailored to you — no strings attached.",
        cta: "Contact us for a personalized quote",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "Premium brand design",
            body: "Custom visual identity built around your restaurant — colors, typography, photography layouts, and micro-animations that create a real wow-factor.",
          },
          {
            title: "Online reservations",
            body: "Integrated reservation flow that lets guests book a table in seconds, directly from your site — no third-party fees, no missed calls.",
          },
          {
            title: "Integrated digital menu",
            body: "Your full menu lives on the site — always up to date, beautifully formatted, and accessible from any device without an app.",
          },
          {
            title: "Local SEO optimized",
            body: "Technical SEO baked in from day one: semantic HTML, structured data, fast load times, and Google Business integration to rank in local search.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than a website —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Built to convert, not just look good",
            body: "Every section — from the hero to the menu — is designed with proven conversion patterns that turn visitors into reservations.",
          },
          {
            title: "Fast delivery, zero tech headaches",
            body: "Full project live in under 2 weeks. We handle hosting, updates, and performance monitoring so you focus on running your restaurant.",
          },
          {
            title: "Your brand, your asset",
            body: "You own it. The design, the content, the domain. We build it to last and hand you full control with no lock-in.",
          },
          {
            title: "Proven for local restaurants",
            body: "Tested with Sacramento-area restaurants — Mexican, American, and Latino concepts — that saw measurable increases in walk-ins and online reservations.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Let's build your",
        titleHighlight: "restaurant's best page.",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to kick things off.",
        button: "Request my site",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in our Premium Website! I'm Aria from Conect-R. I'll guide you through booking a consultation.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I would like to request my Premium Website",
      demoUserMessage: "I would like to book a demo",
    },
    chamba: {
      hero: {
        pill: "CHAMBA",
        title: "Chamba",
        titleHighlight: "All-in-one Restaurant Management Software",
        subtitle: "Chamba is a Restaurant Management Software that centralizes your entire operation in a single program. It connects to the major POS systems and shows your sales in real time, optimizes your labor with AI, processes payroll, runs inventory and food cost control, and lets you order directly from the app to vendors like US Foods, Sysco and more — no more juggling five different systems.",
        cta: "Activate Chamba",
      },
      quote: {
        pill: "GET A QUOTE",
        title: "Personalized quote",
        body: "Every business runs differently. Tell us what you need and we'll put together a proposal tailored to you — no strings attached.",
        cta: "Contact us for a personalized quote",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "POS connection & live sales",
            body: "Connect directly with major POS systems. Monitor your sales and ticket volume in real time from anywhere.",
          },
          {
            title: "AI-powered labor",
            body: "Leverage intelligent predictive modeling to match staff schedules with expected sales, minimizing labor cost waste.",
          },
          {
            title: "Automated payroll",
            body: "Streamline shift audits, calculate wages, and run payroll in a single dashboard without external sheets.",
          },
          {
            title: "Inventory & Food Cost Control",
            body: "Keep live stock counts, monitor product costs, and manage recipe portions to protect your margin.",
          },
          {
            title: "Direct vendor ordering",
            body: "Send purchase orders directly to distributors like US Foods, Sysco, and local vendors directly from the app.",
          },
          {
            title: "Schedules shifts & tips",
            body: "Schedule shifts with ease, track worker clock-ins, and distribute tips fairly based on actual hours.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than software —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Everything in one program",
            body: "Say goodbye to juggling five different platforms. POS, labor, payroll, inventory, and purchasing unified.",
          },
          {
            title: "Live sales from your phone",
            body: "Check in on your business performance anytime, anywhere. Instant access to real-time sales numbers.",
          },
          {
            title: "AI that cuts wasted hours",
            body: "Optimize labor scheduling. AI analyzes history and forecasts schedules, saving hundreds of dollars a month.",
          },
          {
            title: "Direct ordering to top vendors",
            body: "Order from US Foods, Sysco, and others. Speed up replenishment and minimize data entry errors.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Ready to launch Chamba?",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to kick things off.",
        button: "Activate Chamba",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in Chamba! I'm Aria from Conect-R. I'll guide you through activating Chamba.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I would like to activate Chamba",
      demoUserMessage: "I would like to book a demo",
    },
    tableReserve: {
      hero: {
        pill: "TABLE RESERVE",
        title: "Table Reserve",
        titleHighlight: "Automated bookings that fill seats",
        subtitle: "Table Reserve replaces the paper notebook and the phone calls. Your customers book 24/7 from your site or socials, you receive automatic confirmations and your host sees floor occupancy in real time from a tablet.",
        cta: "Try Table Reserve",
      },
      quote: {
        pill: "GET A QUOTE",
        title: "Personalized quote",
        body: "Every business runs differently. Tell us what you need and we'll put together a proposal tailored to you — no strings attached.",
        cta: "Contact us for a personalized quote",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "24/7 bookings",
            body: "Customers book from web, Instagram, Google and WhatsApp — nobody has to pick up the phone.",
          },
          {
            title: "Live admin panel",
            body: "Your host runs the floor from a tablet: tables, timing, seated/open, no paper.",
          },
          {
            title: "Automatic confirmations",
            body: "SMS + email confirmation and reminder — cuts no-shows by up to 60%.",
          },
          {
            title: "Capacity control",
            body: "Define tables by size, time slots per hour and blocks for private events.",
          },
          {
            title: "Built-in waitlist",
            body: "Synced with NextUp for walk-ins when you're full.",
          },
          {
            title: "Occupancy reports",
            body: "How many reservations, how many confirmed, how many no-shows. Real data to decide.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than software —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Up to 60% fewer no-shows",
            body: "Automatic SMS and email reminders prompt guests to confirm or cancel early, keeping tables full.",
          },
          {
            title: "Embedded on your site and Google",
            body: "Allow bookings from search results, social maps, and your site using smooth inline widgets.",
          },
          {
            title: "No commission per reservation",
            body: "Flat SaaS fee instead of high per-cover charges. Keep 100% of the margins unlike OpenTable.",
          },
          {
            title: "Bilingual support in under 2 hours",
            body: "Local support team responding in both English and Spanish when you need assistance on the floor.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Ready to launch Table Reserve?",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to kick things off.",
        button: "Try Table Reserve",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in Table Reserve! I'm Aria from Conect-R. I'll guide you through setting up your trial.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I would like to try Table Reserve",
      demoUserMessage: "I would like to book a demo",
    },
    nextUp: {
      hero: {
        pill: "NEXTUP",
        title: "NextUp",
        titleHighlight: "Synchronized digital waitlist",
        subtitle: "No more pagers and people standing at the door. NextUp lets your customers check in from their phone, walk around the mall and receive an SMS when their table is ready.",
        cta: "Activate NextUp",
      },
      quote: {
        pill: "GET A QUOTE",
        title: "Personalized quote",
        body: "Every business runs differently. Tell us what you need and we'll put together a proposal tailored to you — no strings attached.",
        cta: "Contact us for a personalized quote",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "Check-in from phone",
            body: "QR at the door. Customer scans, types name and party size. Done.",
          },
          {
            title: "SMS notifications",
            body: "Turn updates, ready-to-seat and reminders — no app required.",
          },
          {
            title: "Estimated wait time",
            body: "Auto-calculated from your restaurant's real turn rate.",
          },
          {
            title: "Synced with Table Reserve",
            body: "Reservations + walk-ins in the same host view.",
          },
          {
            title: "Public display",
            body: "Shows the next 10 on a TV — customers see they're moving up.",
          },
          {
            title: "Customer data",
            body: "Captures email/phone for remarketing and newsletter with consent.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than software —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Cuts line abandonment by up to 35%",
            body: "Guests don't have to stand at the door. They wander around, grab a drink, and return when texted.",
          },
          {
            title: "No app — works over web/SMS",
            body: "Zero downloads required for customers. Works instantly on any smartphone browser and via SMS.",
          },
          {
            title: "Integrated with Table Reserve",
            body: "Combines your active waitlist and booked reservations in a single host view dashboard.",
          },
          {
            title: "Builds a customer database",
            body: "Grows your loyalty list naturally by capturing phone numbers and emails on check-in.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Ready to launch NextUp?",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to kick things off.",
        button: "Activate NextUp",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in NextUp! I'm Aria from Conect-R. I'll guide you through activating your digital waitlist.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I would like to activate NextUp",
      demoUserMessage: "I would like to book a demo",
    },
    chopChop: {
      hero: {
        pill: "CHOP CHOP",
        title: "Chop Chop",
        titleHighlight: "Earn more. Work less.",
        subtitle: "Chop Chop is Conect-R's booking platform built for barbershops and salons. Clients pick their stylist, request a time, and you approve the appointment right from your phone — no calls, no missed messages, no back-and-forth.",
      },
      features: {
        pill: "WHAT IT DOES",
        title: "Your schedule,",
        titleHighlight: "on autopilot.",
        list: [
          {
            title: "3-step booking",
            body: "Clients pick their stylist, request a time, and you approve. That simple.",
          },
          {
            title: "Professional profile",
            body: "Every stylist gets their own profile with a photo, specialty, and location so clients can find them easily.",
          },
          {
            title: "Manage from your phone",
            body: "Handle your schedule wherever you are, without being glued to the phone.",
          },
          {
            title: "Bilingual support",
            body: "Serve more clients in English and Spanish, no barriers.",
          },
        ],
      },
      whyUs: {
        pill: "WHY IT'S WORTH IT",
        title: "Fewer calls,",
        titleHighlight: "more bookings.",
        list: [
          {
            title: "Save time",
            body: "Stop answering calls and texts just to book appointments — the system does it for you, all day long.",
          },
          {
            title: "More bookings, more income",
            body: "An easier booking process means fewer lost clients and more confirmed appointments every week.",
          },
          {
            title: "Grow your client base",
            body: "Get found and booked directly, any time of day — even when your hands are full.",
          },
          {
            title: "Fewer no-shows",
            body: "The approval system cuts down on last-minute cancellations and empty slots in your schedule.",
          },
        ],
      },
      cta: {
        pill: "READY TO START",
        title: "Ready to earn more and work less?",
        subtitle: "Join Chop Chop and let the platform handle your bookings while you focus on the work.",
        button: "Get Chop Chop",
        backToHome: "Back to home",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your barbershop or salon?",
      demoUserMessage: "I would like to book a demo",
    },
    tvMenuBoards: {
      hero: {
        pill: "TV MENU BOARDS",
        title: "TV Menu Boards",
        titleHighlight: "Digital screens we manage for you",
        subtitle: "Forget printing new menus every season. Our screens rotate events, menus with prices and animated promos — all managed by Conect-R. You send a message, we update.",
        cta: "Activate TV Boards",
      },
      quote: {
        pill: "GET A QUOTE",
        title: "Personalized quote",
        body: "Every business runs differently. Tell us what you need and we'll put together a proposal tailored to you — no strings attached.",
        cta: "Contact us for a personalized quote",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "Auto rotation",
            body: "Events, menu with prices and photos, animated promos — they cycle on their own every few seconds.",
          },
          {
            title: "WhatsApp updates",
            body: "You message us and we change content on all your screens in minutes.",
          },
          {
            title: "Premium templates",
            body: "Pro design ready to use — Taco Tuesday, Happy Hour, Brunch, events.",
          },
          {
            title: "Animated content",
            body: "Promos with motion that grab way more attention than static printouts.",
          },
          {
            title: "No on-site techs",
            body: "Everything updates from the cloud. Nobody touches the TVs.",
          },
          {
            title: "Multi-screen",
            body: "Different content per location: bar, terrace, dining — all from one console.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than software —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Setup in a single visit",
            body: "Our technician installs and tests everything in a single visit, so you are up and running immediately.",
          },
          {
            title: "Content updated in minutes",
            body: "Send a text over WhatsApp and our designers deploy updates to all of your screens instantly.",
          },
          {
            title: "No software to learn",
            body: "Zero learning curve for you or your staff. We handle all design and technology management.",
          },
          {
            title: "Replaces printed menus and signage",
            body: "Eliminate repetitive printing costs and keep your pricing and items dynamic and fresh.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Ready to launch TV Menu Boards?",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to activate your TV menu boards.",
        button: "Activate TV Boards",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in TV Menu Boards! I'm Aria from Conect-R. I'll guide you through setting up your digital boards.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I would like to activate TV Menu Boards",
      demoUserMessage: "I would like to book a demo",
    },
    businessConsulting: {
      hero: {
        pill: "BUSINESS CONSULTING",
        title: "Business Consulting",
        titleHighlight: "More profit, less guessing.",
        subtitle: "We analyze your restaurant in depth and roll out measurable optimizations so every table, every dish and every shift drives more profit.",
        cta: "I want a free diagnosis",
      },
      stats: {
        pill: "PROVEN RESULTS",
        title: "Studies that turn into real money",
        subtitle: "We deliver concrete financial improvements through data-driven operational redesigns.",
        metrics: [
          {
            value: "+28%",
            label: "Average net profit lift",
          },
          {
            value: "-18%",
            label: "Food cost after menu engineering",
          },
          {
            value: "+34%",
            label: "Average ticket in optimized hours",
          },
        ],
      },
      features: {
        pill: "OUR METHOD",
        title: "A structured roadmap to",
        titleHighlight: "maximizing efficiency.",
        list: [
          {
            number: "01",
            title: "Operational Diagnosis",
            body: "Deep study of sales, costs, service times, waste, table turnover and POS data — pinpointing exactly where money is leaking.",
          },
          {
            number: "02",
            title: "Strategic Plan",
            body: "Concrete recommendations: menu re-engineering, price strategy, shift redesign, tip policy, local marketing and digital activation.",
          },
          {
            number: "03",
            title: "Guided Implementation",
            body: "We activate the Conect-R modules you need, train the team and leave processes documented so the business no longer depends on one person.",
          },
          {
            number: "04",
            title: "Profit Measurement",
            body: "Monthly KPI dashboard: average check, food cost %, labor %, occupancy and net profit — clear before vs. after comparison.",
          },
        ],
      },
      cta: {
        pill: "READY TO OPTIMIZE",
        title: "Ready to optimize your restaurant?",
        subtitle: "Talk to Aria — our AI assistant will gather your details and connect you with our consulting team to get started.",
        button: "I want a free diagnosis",
        backToHome: "Back to home",
        socialProof: [
          "Flexible terms",
          "Full project live in under 2 weeks",
          "Bilingual support (EN/ES)",
          "Sacramento-based team",
        ],
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in our Business Consulting services! I'm Aria from Conect-R. I'll guide you through scheduling your free diagnosis.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      chatUserMessage: "I want a free diagnosis",
      demoUserMessage: "I would like to book a demo",
    },
    conectrStation: {
      hero: {
        pill: "CONECT-R STATION",
        title: "Conect-r Station",
        titleHighlight: "Sell more. Pay less commission.",
        subtitle: "The complete dashboard for restaurants, food trucks, and catering businesses: ordering and payment from the table, 24/7 event bookings, and one link with your menu, social media, and delivery apps — accessible with a sleek NFC stand or a QR code, whichever you prefer.",
        cta: "Create your free account",
      },
      support: {
        pill: "TECHNICAL SUPPORT",
        title: "Technical support, 24/7",
        body: "Have questions about using Station, or need help solving an issue? Text us — we respond in English or Spanish, any day, any time.",
        button: "Send us a message",
        smsBody: "I need help with Station",
      },
      features: {
        pill: "WHAT'S INCLUDED",
        title: "Everything you need,",
        titleHighlight: "nothing you don't.",
        list: [
          {
            title: "Choose how customers reach you",
            body: "Sleek NFC stands for a modern touch, or QR codes: Station generates an editable flyer with your code, plus small QR codes for each table number, ready to print.",
          },
          {
            title: "Ordering and payment from the table",
            body: "Customers order and pay from their phone; the order goes straight to the kitchen, no errors.",
          },
          {
            title: "24/7 event bookings",
            body: "Receive catering requests with the deposit already collected, even while you're closed.",
          },
          {
            title: "Real-time location",
            body: "Perfect for food trucks and stands: your customers always know where to find you today.",
          },
        ],
      },
      whyUs: {
        pill: "WHY TEAMS CHOOSE US",
        title: "More than software —",
        titleHighlight: "a growth engine.",
        list: [
          {
            title: "Stop giving away commission",
            body: "Every order that comes through your link or QR is money you're not handing to DoorDash or Uber Eats.",
          },
          {
            title: "Your servers wait tables, not notepads",
            body: "During the rush, the order goes straight to the kitchen. Fewer mistakes, less pressure.",
          },
          {
            title: "Never miss an event",
            body: "Booking requests arrive with the deposit already collected, even if you never answered the phone.",
          },
          {
            title: "Update your menu in seconds",
            body: "Raise a price or add a new dish from your phone. No reprinting.",
          },
        ],
      },
      cta: {
        pill: "READY TO LAUNCH",
        title: "Ready to sell more and pay less commission?",
        subtitle: "Try Conect-r Station and let the platform handle your orders, payments, and online presence while you focus on cooking.",
        button: "Create your free account",
        backToHome: "Back to home",
      },
      footer: {
        rights: "© {year} Conect-R. Sacramento, CA. All rights reserved.",
      },
      demoGreeting: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
      chatGreeting: "Thanks for your interest in Conect-r Station! I'm Aria from Conect-R. I'll guide you through ordering your station.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?",
      signupNote: "First month free. After that, $100/month if you want to accept Venmo, Cash App, and card — or free if your customers pay directly through Station.",
      chatUserMessage: "I would like to order my Conect-r Station",
      demoUserMessage: "I would like to book a demo",
    },
  },
} as const;

export type Translations = typeof translations;

export function getT(lang: Lang) {
  return translations[lang];
}
