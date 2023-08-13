import './Modal.css'


function Modal(props) {
    return <>
        <div className='overlay'></div>

        <div className='app__modalClosed'>


            <button className='app__btn_modalClosed' onClick={() => {
                props.modalSetter(() => {
                    return ''
                })
            }}>X</button>
            <div className='modalContent'>
                <p className="firstMessage"> Choose your level of difficulty!</p>
                <div className="little-buttons">


                    <button onClick={() => {
                        props.colorSetter(() => {

                            return '#222'
                        })
                        props.screenElementsSetter(() => {
                            return 'EasyMode'
                        })

                        props.modalSetter(() => {
                            return ''
                        })
                    }} className="little easy">Easy</button>




                    <button onClick={() => {
                        props.colorSetter(() => {

                            return '#222'
                        })
                        props.screenElementsSetter(() => {
                            return 'MediumMode'
                        })

                        props.modalSetter(() => {
                            return ''
                        })

                    }} className="little medium">Normal</button>





                    <button onClick={() => {
                        props.colorSetter(() => {

                            return '#222'
                        })
                        props.screenElementsSetter(() => {
                            return 'HardMode'
                        })

                        props.modalSetter(() => {
                            return ''
                        })

                    }} className="little hard">Hard</button>

                </div>

            </div>
        </div>


    </>
}
export default Modal
