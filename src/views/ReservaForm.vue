<script>
import MenuItem from '../components/MenuItem.vue';
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapState, mapActions } from "pinia";
import { useDataStore } from "../stores/data";
import * as yup from 'yup';

const schema = {
    nombre: yup.string().required().min(10).max(50),
    email: yup.string().required().email(),
    telefono: yup.string().required(),
    observaciones: yup.string(),
    numeroComensales: yup.number().required().min(1)
}
export default {
    components: {
        MenuItem,
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            reserva: {},
            editando: false,
            schema: schema,
        };
    },
    computed: {
        ...mapState(useDataStore, {
            alergenos: 'alergenos',
            getMenuById: 'getMenuById'
        }),

        titulo() {
            return (this.editando ? 'Editar' : 'Crear') + ' reserva'
        },
        menu() {
            return this.getMenuById(this.$route.params.id)
        }
    },
    mounted() {

        document.querySelector('input[value="si"]').addEventListener('click', function () {
            document.querySelector('#alergenos').style.display = 'block';
        });

        document.querySelector('input[value="no"]').addEventListener('click', function () {
            document.querySelector('#alergenos').style.display = 'none';
        });
        // if (this.$route.params.id) {
        //     this.editando = true;
        //     this.cargareserva();
        // }
    },
    methods: {
        ...mapActions(useDataStore, ['getReserva', 'saveReserva']),
        cargaReserva() {
            this.reserva = this.getReserva(this.$route.params.id)
        },
        async submitForm(values) {

            if (document.querySelector('#alergenos').style.display = 'none') {
                values['alergenos'] = []
            }

            var checkbox = document.getElementById("suscrito");
            var isSuscrito = checkbox.checked;
            values['suscrito'] = isSuscrito

            if (await this.saveReserva(values)) {
                this.$router.push('/')
            }
        },
    },
};
</script>
<template>
    <div class="row">

        <div class="col-6 form-container">
            <Form :initial-values="reserva" @submit="submitForm" :validation-schema="schema">
                <fieldset>
                    <h1>{{ titulo }}</h1>
                    <!-- Aquí los inputs y botones del form -->
                    <div class="form-group">
                        <Field type="hidden" name="id" class="form-control" disabled />
                    </div>
                    <div class="form-group">
                        <Field type="hidden" name="idMenu" :value="this.$route.params.id" class="form-control"
                            disabled />
                    </div>
                    <div class="form-group">
                        <label>Nombre:</label>
                        <Field type="text" name="nombre" class="form-control" />
                        <ErrorMessage class="error" name="nombre" />
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <Field type="email" name="email" class="form-control" />
                        <ErrorMessage class="error" name="email" />
                    </div>
                    <div class="form-group">
                        <label>Telefono:</label>
                        <Field type="text" name="telefono" class="form-control" />
                        <ErrorMessage class="error" name="telefono" />
                    </div>
                    <div class="form-group">
                        <label>Comensales:</label>
                        <Field type="number" class="form-control" name="numeroComensales" />
                        <ErrorMessage class="error" name="numeroComensales" />
                    </div>

                    <div class="form-group">
                        <label>¿Alguno de los comensales presenta alguna alergia?</label><br>
                        <input type="radio" id="si" name="alergia" value="si">
                        <label for="si">Sí</label><br>
                        <input type="radio" id="no" name="alergia" value="no" checked>
                        <Field name="alergenos" type="checkbox" hidden />
                        <label for="no">No</label>
                    </div>

                    <div class="form-group row" id="alergenos" style="display: none;">
                        <p class="alergeno-mensaje">Por favor, indique en Observaciones cuántos y que comensales son
                            alérgicos a los seleccionados</p>
                        <label class="col-12">Selecciona los alérgenos:</label>
                        <div class="form-check col-6" v-for="alergeno in alergenos" :key="alergeno.id">
                            <Field name="alergenos" type="checkbox" :value="alergeno.id" />
                            <img :src="'/src/assets/img/alergenos/' + alergeno.img" /> {{ alergeno.nombre }}
                        </div>
                        <ErrorMessage class="error" name="alergenos" />
                    </div>

                    <div class="form-group">
                        <label>Observaciones:</label>
                        <Field type="text" name="observaciones" class="form-control" />
                        <ErrorMessage class="error" name="observaciones" />
                    </div>
                    <div class="form-group">
                        <Field type="checkbox" id="suscrito" name="suscrito" />
                        <p>¿Desea recibir información de L'assaig en un futuro?<br>
                            Podrás enterarte de todo y apoyarnos de esta manera ♡</p>
                        <ErrorMessage class="error" name="suscrito" />
                    </div>

                    <br>
                    <button type="submit" class="btn guardar">Guardar</button>
                    <button type="button" class="btn cancelar" @click="$router.push('/')">
                        Cancelar
                    </button>
                </fieldset>
            </Form>
        </div>
        <div class="col-6 menu-container">
            <menu-item :key="menu.id" :menu="menu"></menu-item>
        </div>
    </div>
</template>


<style scoped>
.error {
    color: red;
}
</style>