import BehaviourComponent from "../components/behaviour.component";
import Navbar from "../components/navbar.component";
import { Behaviour, BehaviourService } from "../services/behaviour.service";

export interface BehaviourProps {
  behaviours: Behaviour[];
}

export default function Behaviours(props: BehaviourProps) {
  return (
    <>
      <Navbar></Navbar>
      <p className='text-xl p-10 text-white bg-orange-500'>Choose any behaviour to proceed</p>
      <div className="grid gap-10 grid-cols-3 p-20 ">
        {props.behaviours.map((value: Behaviour) => (
          <BehaviourComponent key={value.id} {...value} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const res = await BehaviourService.getBehaviours();
  return {
    props: {
      behaviours: res,
    },
  };
}
