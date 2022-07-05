import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AppContext, appContext } from '../pages/_app';
import { Behaviour } from '../services/behaviour.service';

export default function BehaviourComponent(props: Behaviour) {
  const router = useRouter();
  const context = useContext<AppContext| null>(appContext);

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => {
                if(context?.userCred?.access_token){
                  router.push(`/todo/${props.id}?name=${encodeURIComponent(props.name)}`)
                } else {
                  context?.setSelectedBehaviour({
                    behaviourId: props.id,
                    behaviourName: props.name
                  })
                  router.push(`/login`);
                }
            }}>Choose</button>
          </div>
        </div>
      </div>
    )
}
