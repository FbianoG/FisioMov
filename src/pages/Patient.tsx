import { useEffect, useRef, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Patient.css'
import axios from 'axios'
import { UrlBack } from '../api/api'
import { ActivitiesData, UserData } from '../interface/interface'
import { getUser } from '../api/user'
import { getActivities } from '../api/activities'



const Patient = () => {

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>()
    const [video, setVideo] = useState<Boolean>(false)

    const content = useRef<any>()
    const container = useRef<any>()
    const [pts, setPts] = useState<number>(0)


    useEffect(() => { loadPage() }, [])

    const loadPage = async () => {
        try {
            const [us, ac] = await Promise.all([getUser(), getActivities()])
            setUser(us)
            setActivities(ac)
        } catch (error) {
            console.log(error)
        }
    }


    let model: any;
    let webcam: any;
    let ctx: any;
    let labelContainer: any;
    let maxPredictions: any;


    // Load the image model and setup the webcam
    async function init(URL) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        setVideo(true)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

      
        const flip = true;
        if (innerWidth < 767) {
            webcam = new tmImage.Webcam(400, 400, flip)
        } else {
            webcam = new tmImage.Webcam(500, 500, flip)
        }
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        setPts(prediction[0].probability)
        // for (let i = 0; i < maxPredictions; i++) {
        //     const classPrediction =
        //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        //     labelContainer.childNodes[i].innerHTML = classPrediction;
        // }
    }

    return (
        <div className="patient">
            <SideBar user={user} />
            <div className="act">
                <h2>Atividades</h2>
                <ul className="act__list">
                    {user?.proced.map(element => {
                        const act = activities?.find(e => e._id === element.id)
                        if (!act) return
                        return (
                            <li key={element.id} className='act__item'>
                                <span style={{ fontSize: '24px' }}>🏋🏼‍♂️</span>
                                <div className="act__item-data">
                                    <p>{act.name}</p>
                                    <span><strong>Series:</strong> {element.series}</span>
                                    <span><strong>Repetições:</strong> {element.qtd}</span>
                                </div>
                                <button onClick={() => init(act.web)}>🌐</button>
                            </li>
                        )
                    })}
                </ul>
                {video &&
                    <div className="video">
                        <a href='' title='Fechar' onClick={() => {
                            setVideo(false);
                            if (webcam && webcam.stream) {
                                webcam.stream.getTracks().forEach(track => track.stop());
                            }
                        }}>❌</a>
                        <div className="content" id='webcam-container' ref={content}></div>
                        <div className='result' id='label-container' ref={container}>
                            <span style={(pts * 100) >= 70 ? { color: '#2ae031' } : { color: 'red' }} >{`${(pts * 100).toFixed(1)}%`}</span>
                            <div className="result__bar" style={{ height: `${pts * 100}%` }}></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default Patient