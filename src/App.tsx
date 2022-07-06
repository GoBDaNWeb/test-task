import {useEffect, useState} from 'react';
import axios from 'axios'
import Form from './components/Form/Form'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserTable from './components/UsersTable/UsersTable'
import {useQuery} from 'react-query'
import {useUsers} from './app/hooks/useUsers'
import {IUsers} from './types'

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box sx={{ p: 3 }}>
			<Typography component='div'>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
}

function a11yProps(index: number) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

const App: React.FC = () => {
	const [value, setValue] = useState<number>(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className='h-screen w-full flex flex-col gap-10 items-center justify-center'>
			<div className='fixed top-40'>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab data-testid='table-tab' label="Таблица" {...a11yProps(0)} />
					<Tab data-testid='form-tab' label="Добавить Пользователя" {...a11yProps(1)} />
				</Tabs>
			</div>
			<div>
				<TabPanel value={value} index={0}>
					<UserTable/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Form/>
				</TabPanel>
			</div>
		</div>
	);
}

export default App