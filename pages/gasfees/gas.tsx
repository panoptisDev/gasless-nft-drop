import { useGas } from "@3rdweb-sdk/react/hooks/useGas";
import { Flex, SimpleGrid, Switch } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { GasEstimatorBox } from "components/gas-estimator/GasEstimatorBox";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { ReactElement, useState } from "react";
import { Badge, Card, Heading, Text } from "tw-components";

export default function GasPage() {
  const [ethOrUsd, setEthOrUsd] = useState<"eth" | "usd">("eth");
  const { data } = useGas();
  const { Track, trackEvent } = useTrack({
    page: "gas-estimator",
  });

  return (
    <Track>
      <NextSeo
        title="Blockchain Gas Estimator"
        description="Estimate the cost of gas fees when deploying contracts or performing common use cases to the blockchain on thirdweb."
        openGraph={{
          title: "Blockchain Gas Estimator | thirdweb",
          url: `https://thirdweb.com/gas`,
        }}
      />
      <Flex mb={4}>
        <Heading mr={3} as="h1">
          Gas Estimator
        </Heading>
        <Flex justifyContent="center" alignItems="center">
          <Badge
            size="label.md"
            colorScheme="green"
            borderRadius="lg"
            px={1}
            py={0.5}
            mr={3}
          >
            Ethereum
          </Badge>
          <Heading size="subtitle.sm">ETH</Heading>
          <Switch
            mx={1.5}
            onChange={() => {
              setEthOrUsd(ethOrUsd === "eth" ? "usd" : "eth");
              trackEvent({
                category: "gas-estimator",
                action: "click",
                label: "switch-currency",
              });
            }}
          />
          <Heading size="subtitle.sm">USD</Heading>
        </Flex>
      </Flex>
      <SimpleGrid as={Card} p={0} columns={{ base: 1, md: 4 }}>
        <GasEstimatorBox
          contractType={"nft-drop"}
          ethOrUsd={ethOrUsd}
          data={data}
          borderTopLeftRadius="xl"
          borderTopRightRadius={{ base: "xl", md: "0" }}
        />
        <GasEstimatorBox
          contractType={"edition-drop"}
          ethOrUsd={ethOrUsd}
          data={data}
        />
      </SimpleGrid>
      <Text mt={4} textAlign="center">
        Estimates calculated at {data?.gasPrice} gwei and the ETH price of $
        {data?.ethPrice}. These estimates are only intended to use for contracts
        deployed with thirdweb. Updated every 10 seconds.
      </Text>
    </Track>
  );
}

GasPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
