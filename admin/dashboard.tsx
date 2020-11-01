import React from "react";

import { Box, H2, Text, Illustration } from "admin-bro";

const pageHeaderHeight = 620;
const pageHeaderPaddingY = 275;
const pageHeaderPaddingX = 250;

const DashboardHeader = () => {
  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={425}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="GithubLogo" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={["default", "lg", pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>Plantify Admin Panel</H2>
        </Text>
      </Box>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={["xl", "xl", "-100px"]}
        mb="xl"
        mx={[0, 0, 0, "auto"]}
        px={["default", "lg", "xxl", "0"]}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      ></Box>
    </Box>
  );
};

export default Dashboard;
