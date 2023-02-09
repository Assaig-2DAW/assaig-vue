<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapState, mapActions } from "pinia";
import { useDataStore } from "../stores/data";
import * as yup from 'yup';

// ============================= ME HE QUEDADO AQUI ==============================================
//  HAY QUE COMPLETAR EL FORMULARIO, Y CREAR LAS FUNCIONES DEL DATA: getReserva... etc,
//  FALTA CREAR EL CALENDARIO (no funciona v-calendar)


const schema = {
    nombre: yup.string().required().min(10).max(50),
    email: yup.string().required().email(),
    telefono: yup.string().required(),
    observaciones: yup.string(),
    comensales: yup.number().required().min(1)
}
export default {
    components: {
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
        }),

        titulo() {
            return (this.editando ? 'Editar' : 'Crear') + ' reserva'
        }
    },
    mounted() {
        if (this.$route.params.idReserva) {
            this.editando = true;
            this.cargareserva();
        }
    },
    methods: {
        ...mapActions(useDataStore, ['getReserva', 'editarReserva', 'addReserva', 'getMenu']),
        maxComensales() {
            let menu = this.getMenu(this.$route.params.id)
            return menu.plazas
        },
        cargaReserva() {
            this.reserva = this.getReserva(this.$route.params.idReserva)
        },
        submitForm(values) {
            if (this.editando) {
                this.editarReserva(values)
                this.$router.push('/')
            } else {
                this.addreserva(values)
                this.$router.push('/')
            }
        },
    },
};
</script>
<template>
    <Form :initial-values="reserva" @submit="submitForm" :validation-schema="schema">
        <fieldset>
            <h1>{{ titulo }}</h1>
            <!-- Aquí los inputs y botones del form -->
            <div class="form-group">
                <Field type="hidden" name="id" class="form-control" disabled />
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
                <label>Alergenos:</label>
                <Field as="select" name="alergenos" multiple class="form-control">
                    <option value="">--- Selecciona alergenos ---</option>
                    <option v-for="alergeno in alergenos" :key="alergeno.id" :value="alergeno.id" :title="alergeno.nombre">
                        <img :src="'../assets/img/alergenos/'+ alergeno.img"/> {{ alergeno.nombre }}
                    </option>
                </Field>
                <ErrorMessage class="error" name="alergenos" />
            </div>
            <div class="form-group">
                <label>Comensales:</label>
                <Field type="number" class="form-control" name="comensales" />
                <ErrorMessage class="error" name="comensales" />
            </div>
            <div class="form-group">
                <Field type="checkbox" name="subscripcion" />
                ¿Desea recibir información?
                <ErrorMessage class="error" name="subscripcion" />
            </div>

            <br>
            <button type="submit" class="btn">Guardar</button>
            <button type="button" class="btn" @click="$router.push('/')">
                Cancelar
            </button>
        </fieldset>
    </Form>
</template>


<style scoped>
.error {
    color: red;
}
</style>