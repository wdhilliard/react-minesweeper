import React, { useState, useContext } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import Board from '../components/board';


const Index = () => {


  return (
    <Layout title="Minesweeper">
      <Head>
        <title>Minesweeper | Will Hilliard</title>
      </Head>
      <Board/>
    </Layout>
  );
};

export default Index;
