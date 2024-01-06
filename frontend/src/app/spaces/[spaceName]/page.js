import styles from "@/app/styles/Body.module.css";
import Left from "@/components/Left";
import Right from "@/components/Right";
import SpaceMiddle from "@/components/spaceMiddle";


export default function Page({ params }) {
    const { spaces, ...remainingParams } = params;
    return (
        <div className={`${styles.mainScreen}`}>
            <div className={`container ${styles.mainContainer}`}>
                <div className={`g-0 justify-content row`}>
                    <div className={`col-12`}>
                        <div className='row gx-0 '>
                            <Left spaces={spaces}/>
                            <SpaceMiddle {...remainingParams}/>
                            <Right/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}