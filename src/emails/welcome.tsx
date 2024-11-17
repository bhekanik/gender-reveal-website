import { config } from "@/lib/config";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const WelcomeEmail = ({ firstName }: { firstName?: string }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to {config.projectName} - {config.projectDescription}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "hsl(340, 65%, 45%)", // Adjust to match your Interview Optimiser branding
                offwhite: "hsl(210, 36%, 96%)",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite font-sans text-base text-brand">
          <Img
            src={`https://${config.domain}/logo.png`}
            width={200}
            height={200}
            alt={`${config.projectName} Logo`}
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-[hsl(210, 36%, 96%)]">
            <Heading className="my-0 text-center leading-8">
              Welcome to {config.projectName}
            </Heading>

            <Section>
              <Row>
                <br />
                <Text className="text-base">Hi {firstName ?? "there"},</Text>

                <Text className="text-base">
                  We&apos;re thrilled to have you join the {config.projectName}{" "}
                  community. Our platform is designed to help you reveal your
                  baby&apos;s gender to your friends and family in a fun and
                  interactive way. We also have several fun features to keep
                  everyone engaged as they wait for the big reveal.
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button
                href={`${config.baseUrl}/dashboard/create`}
                className="bg-brand rounded-lg px-[18px] py-3 text-white"
              >
                Start Your Baby Reveal Now
              </Button>
            </Section>
            <Section>
              <Text className="text-base">
                Thank you for joining us! If you have any questions, feel free
                to contact{" "}
                <Link href={`mailto:${config.supportEmail}`}>
                  our support team
                </Link>
                .
                <br />
                <br />– The {config.projectName} Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
