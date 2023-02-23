<script>
export default {
    computed: {
        isHomePage() {
            return this.$route.path === '/'
        }
    }
}
</script>

<template>
    <footer class="footer row text-center p-3 text-center text-white mt-5">
        <section class="col-12 mx-auto pt-5">
            <div class="row">
                <div class="col-md-3 col-lg-4 col-xl-3 pl-0 text-md-start text-center">
                    <h2 class="mb-4">Informaci&oacute;n</h2>
                    <p>
                        <a href="#" class="enlace">Pol&iacute;tica de privacidad</a>
                    </p>
                    <p>
                        <a href="#" class="enlace">Aviso legal</a>
                    </p>
                    <p>
                        <a href="#" class="enlace">Pol&iacute;tica de cookies</a>
                    </p>
                </div>
                <div v-if="isHomePage" class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4  text-md-start text-center">
                    <h2 class="mb-4">Sitio</h2>
                    <p>
                        <router-link class="enlace" to="/" v-scroll-to="'#calendar'">
                            Reservar
                        </router-link>
                    </p> 
                    <p>
                        <router-link class="enlace" to="/" v-scroll-to="'#about'">
                            Sobre nosotros
                        </router-link>
                    </p>
                </div>
                <div v-else class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4  text-md-start text-center">
                    <h2 class="mb-4">Sitio</h2>
                    <p>
                        <a class="enlace" href="/#calendar">Reservar</a>
                    </p>
                   <p>
                    <a class="enlace" href="/#about">Sobre nosotros</a>
                   </p>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-3 pr-0 mb-md-0 mb-4 text-md-start text-center">
                    <h2 class="mb-4">Contacto</h2>
                    <p><a href="https://goo.gl/maps/xGrAA11JKBAppXYv5"><i class="bi bi-geo-alt-fill"></i></a>
                        <a class="enlace" href="https://goo.gl/maps/xGrAA11JKBAppXYv5">Unió Musical 8, 03802 Alcoi</a></p>
                    <p>
                        <a href="mailto:email@email.es"><i class="bi bi-envelope-fill"></i></a>
                        <a class="enlace" href="mailto:email@email.es">email@email.es</a>
                    </p>
                    <p><a href="tel:+34627371351"><i class="bi bi-telephone-fill"></i></a>
                        <a class="enlace" href="tel:+34627371351">+ 34 627 37 13 51</a></p>
                </div>
                <div class="row mt-3">
                    <div class="py-3 col-md-4 col-12 text-md-start text-center">
                        © L'assaig 2023 | Todos los derechos reservados.
                    </div>
                    <div class="py-3 offset-md-4 col-md-4 col-12  text-md-end text-center">
                        Diseño y desarrollo:
                        <a class="enlace" href="https://portal.edu.gva.es/cipfpbatoi/">cipfpbatoi</a>
                    </div>
                </div>
            </div>
        </section>
    </footer>
</template>
