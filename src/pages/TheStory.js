import React, { useState } from 'react';
import './TheStory.css';
import founderImg from './founder.png';

const storySections = [
  {
    title: 'Meet Our Founder',
    content: (
      <>
        <p className="the-story-body">This is Jake. Just a year ago, Jake was over $20,000 in debt. He wasn't buying Ferraris. He just made the mistake everyone makes when they get their first Amex. Flights to Vegas. Clubs in Miami. Late nights in New York. Expensive drinks, overpriced dinners, "it's only money" energy.</p>
        <p className="the-story-body">Jake wasn't stupid. He just thought he was gonna be rich tomorrow—so what was the problem with spending like it today? The problem? Reality doesn't care about vibes. Rent hit. Bills stacked up. And that "I'll pay it off next month" mindset turned into minimum payments and maxed-out cards.</p>
      </>
    ),
  },
  {
    title: 'The Failed Solutions',
    content: (
      <p className="the-story-body">He tried to fix it. Budgeting apps? Confusing. Spreadsheets? Exhausting. Financial advice? Preachy. He'd say "I need to stop spending," and then reward himself for saying it… by buying something. Classic.</p>
    ),
  },
  {
    title: 'The Turning Point',
    content: (
      <>
        <p className="the-story-body">Then it got real. First, his mom found out. She saw the debt. Didn't yell. Just shook her head. And said the words no child wants to hear: <em>"I thought I raised you better."</em></p>
        <p className="the-story-body">That was the moment. Jake promised himself he would turn it all around. Make mom proud.</p>
      </>
    ),
  },
  {
    title: 'The Revelation',
    content: (
      <>
        <p className="the-story-body">Then, the real gut-punch: He asked his friends what their net worth was. Some lied. Some joked. But most were in the exact same mess. Pretending to be rich. Drowning in debt. No plan. No savings. No clue.</p>
        <blockquote className="the-story-quote">"Nobody talks about money, but everybody's worried about it."</blockquote>
      </>
    ),
  },
  {
    title: 'The Quest Solution',
    content: (
      <>
        <p className="the-story-body">So Jake built something different: Not a budgeting app. Not a spreadsheet. Not another boring tool you download, ignore, then delete.</p>
        <p className="the-story-body">Lumeo is a social finance platform built for people who hustle hard, flex smart, and are done being broke. It's money meets leaderboard. It's net worth meets dopamine. It's saving, growing, winning—and showing your friends how it's done.</p>
        <blockquote className="the-story-quote">"If we can compete on Instagram likes, gym gains, and Wordle streaks… why not compete on building real wealth?"</blockquote>
      </>
    ),
  },
  {
    title: 'The Transformation',
    content: (
      <>
        <p className="the-story-body">Now this is Jake. He's still got the AirPod in his right ear. Still grinding. Still working insane hours. But the difference? Jake's not broke anymore. His credit score's climbing. His savings are stacking. His mom's bragging. And that Amex? Paid in full.</p>
        <p className="the-story-body">Want to know how he did it? Lumeo. He got honest. He got help. And then he built the tool we all wish existed.</p>
        <p className="the-story-body" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '30px'}}>Welcome to Lumeo. Track it. Save it. Flex it. Win.</p>
      </>
    ),
  },
];

const TheStory = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="the-story-template-container">
      <h1 className="team-title">The story</h1>
      <div className="the-story-split-panel" style={{display: 'flex', gap: '40px', alignItems: 'flex-start', margin: '40px 0'}}>
        <div className="the-story-titles-list" style={{minWidth: '220px', maxWidth: '260px', flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {storySections.map((section, idx) => (
            <button
              key={section.title}
              className={`the-story-title-btn${selected === idx ? ' selected' : ''}`}
              style={{
                background: selected === idx ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#ea580c',
                padding: '18px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: selected === idx ? '0 2px 12px rgba(255,152,0,0.08)' : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                outline: selected === idx ? '2px solid #ea580c' : 'none',
              }}
              onClick={() => setSelected(idx)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="the-story-content-panel" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '32px'}}>
          <div className="the-story-card" style={{background: '#fff', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '40px', minHeight: '320px'}}>
            <h2 className="the-story-title" style={{color: '#ea580c', fontWeight: 800}}>{storySections[selected].title}</h2>
            {storySections[selected].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheStory;