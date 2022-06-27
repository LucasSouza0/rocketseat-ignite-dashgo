import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Props as ApexProps } from 'react-apexcharts';
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const options: ApexProps = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-03-09T00:00:00.000Z',
      '2022-03-10T00:00:00.000Z',
      '2022-03-11T00:00:00.000Z',
      '2022-03-12T00:00:00.000Z',
      '2022-03-13T00:00:00.000Z',
      '2022-03-14T00:00:00.000Z',
      '2022-03-15T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'darck',
      opacityFrom: 0.7,
      opacityT0: 0.3,
    }
  }
};

const series = [
  { name: 'series1', data: [31, 25, 10, 28, 51, 18, 109] }
];

const Dashboard: NextPage = () => {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' my='6' mx='auto' px='6' maxWidth={1480}>
        <Sidebar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignContent='flex-start'>
          <Box
            p={['6', '8']}
            pb='4'
            bg='gray.800'
            borderRadius={8}
          >
            <Text fontSize='lg' mb='4'> Inscritos da semana </Text>
            <Chart 
              options={options}
              series={series}
              type='area' 
              height={160}
             />
          </Box>

          <Box
            p={['6', '8']}
            pb='4'
            bg='gray.800'
            borderRadius={8}
          >
            <Text fontSize='lg' mb='4'> Taxa de abertura </Text>
            <Chart 
              options={options}
              series={series}
              type='area' 
              height={160}
             />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
