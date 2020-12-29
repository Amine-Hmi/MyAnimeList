import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnimeGrid from './AnimeGrid';
import './TabMenu.css';

const TabMenu = (items,isLoading) => {



return (
<Tabs>
    <TabList>
      <Tab>Home</Tab>
      <Tab>Search</Tab>
      <Tab>About</Tab>
    </TabList>

    <TabPanel>
    <div className="Grid-cnt">
      <div className='Grid'>
      <AnimeGrid items={items} isLoading={isLoading}/>
      </div>
      </div>
    </TabPanel>
    <TabPanel>
      <h2>Search your favourite animes</h2>
    </TabPanel>
    <TabPanel>
      <h2>Created By Amin Hammami</h2>
    </TabPanel>
  </Tabs>
)
}

export default TabMenu;