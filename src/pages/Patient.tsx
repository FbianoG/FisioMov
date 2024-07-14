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

    useEffect(() => { console.log(pts) }, [pts])

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
    let containerResult: any;
    let maxPredictions: any;
    
    async function init(URL: string) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        setVideo(true);
    
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    
        const size = 500; // Define a size suitable for both desktop and mobile
        const flip = true;
        webcam = new tmPose.Webcam(size, size, flip);
    
        try {
            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);
    
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            canvas.width = size;
            canvas.height = size;
            ctx = canvas.getContext("2d");
    
            // Mobile-specific adjustments
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
                document.body.addEventListener('touchstart', preventScroll, { passive: false });
            }
    
        } catch (error) {
            console.error("Webcam setup failed:", error);
        }
    }
    
    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    async function predict() {
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput); // output do vídeo 
        setPts(prediction[0].probability);
        drawPose(pose);
    }
    
    function drawPose(pose: any) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }
    
    function preventScroll(event: Event) {
        event.preventDefault();
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
                        <canvas className="content" id='canvas' ref={content}></canvas>
                        <div className='result' ref={container}>
                            <span style={(pts * 100) >= 70 ? { color: '#2ae031' }: {color: 'red'}} >{`${(pts * 100).toFixed(1)}%`}</span>
                            <div className="result__bar" style={{ height: `${pts * 100}%` }}></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default Patient