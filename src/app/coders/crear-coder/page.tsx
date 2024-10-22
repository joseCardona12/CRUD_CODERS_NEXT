import { FormCreateCoder } from "@/components";
import { coderController } from "@/controllers";
export default function CrearCoderView(){
    return (
        <section className="section-create-coder">
            <div className="coder-form-create">
                <FormCreateCoder 
                title="Create coder" />
            </div>
        </section>
    )
}