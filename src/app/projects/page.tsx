'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

const projects = [
  {
    title: 'Discovery',
    src: '/projects/Discovery.png',
    description:
      'An innovative exploration platform showcasing cutting-edge features and interactive experiences.',
    href: '/projects',
    tag: 'Biggest Event In ADCET',
    color: '#6C63FF'
  },
  {
    title: 'Neuroverse',
    src: '/projects/Neuroverse.png',
    description:
      'A neural network visualization tool exploring the frontiers of artificial intelligence and machine learning.',
    href: '/projects',
    tag: 'Event From AI&DS Department',
    color: '#ee5622'
  },
  {
    title: 'Codathon',
    src: '/projects/codathon.png',
    description:
      'An intensive coding competition platform connecting developers worldwide to solve challenging problems.',
    href: '/projects',
    tag: 'Coding Competition',
    color: '#4CAF50'
  },
  {
    title: 'Hackathon',
    src: '/projects/hackathon.png',
    description:
      'A 24-hour innovation challenge bringing together teams to build creative solutions and prototype ideas.',
    href: '/projects',
    tag: 'Hackathon Event',
    color: '#FF9800'
  }
];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'Our Projects'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => {
              return (
                <Link href={project.href} key={index}>
                  <ProjectLink
                    index={index}
                    title={project.title}
                    tag={project.tag}
                  />
                </Link>
              );
            })}
          </div>
          <Modal projects={projects} />
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
