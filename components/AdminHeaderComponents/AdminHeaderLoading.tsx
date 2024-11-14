import styles from '../../components/DashboardComponents/TabComps.module.css';
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function AdminHeaderLoading(){

    return(
      <div className='h-[65px] bg-white pl-6 pr-6 rounded-t-lg flex flex-row items-center justify-between'>     
        <Skeleton width={'400px'} height={'32px'} />
        <div className='flex flex-row'>
        {/* <Skeleton width={'32x'} height={'32px'}/> */}
        
        <div className='ml-[20px]'>{<Skeleton width={'180px'} height={'32px'}/>}</div>

        </div>

      </div>
    );
}

export default AdminHeaderLoading;