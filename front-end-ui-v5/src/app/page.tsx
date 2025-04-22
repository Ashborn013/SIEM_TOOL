"use client"
import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/react";
import { Divider, Link, Image} from "@heroui/react";
import Sidebar from '@/components/sidebar-props/sidebar-main';
import BrowserChart from '@/components/charts/bar';

export default function page() {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='pl-3'>
    <BrowserChart/>

      </div>

    </div>
  )
}

