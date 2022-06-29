import { OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home } from './Home'
import * as THREE from 'three'
import { Products } from './Products';
import { Gallery } from './Gallery';


const Animated = () => {
  const location = useLocation();
  return (
   
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/> }></Route>
        <Route path="/products" element={<Products/> }></Route>
        <Route path="/gallery" element={<Gallery/> }></Route>
      </Routes>
   
  );
};

function App() {
  return (
    <>
      <Router>
        <Animated />
      </Router>
    </>
  );
}

export default App;
