import sillas from "../assets/sillas.png";
import nosillas from "../assets/nogroups.png";

export default function ShowGroups({groups}){
  return(
    <div
      className='d-flex justify-content-center p-3'
    >
      {
        groups.length > 0 ?
          groups.map((group, index) => (
            <section key={index} className='p-3'>
              <h5>
                Grupo {group.id}
              </h5>
              <img src={sillas} alt='silla'/>
              <h5>
                {group.points} puntos
              </h5>
            </section>
          ))
          :
          <section className='p-3'>
            <img src={nosillas} alt='silla' />
          </section>
      }
    </div>
  )
}