import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";


const Controller = ({step, data, onChange, categories}) => {
    switch (step) {
        case 1: return <Step1 data={data} onChange={onChange} categories={categories}/>
        case 2: return <Step2 data={data} onChange={onChange}/>
        case 3: return <Step3 data={data} onChange={onChange} />
    }
}

export default Controller