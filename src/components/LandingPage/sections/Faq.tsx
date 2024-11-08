import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="mt-[150px] flex flex-col justify-center items-center">
      {/* Heading text */}
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#FFFFFF] to-[#9999998F]/55 bg-clip-text text-transparent">
        FAQs
      </h1>

      {/* FAQs */}
      <div className="">
        <Accordion
          type="single"
          collapsible
          className="sm:w-[600px] sm:mx-0 w-[300px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="sm:text-lg text-md">
              How does Risk Radar find vulnerabilities?
            </AccordionTrigger>
            <AccordionContent className="sm:text-md text-sm">
              Risk Radar continuously scans trusted sources across the internet,
              identifying emerging threats and vulnerabilities specific to the
              products you monitor. Our system uses advanced algorithms to
              provide timely alerts, so you can act before vulnerabilities
              become critical.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="sm:text-lg text-md">
              Will I get notified instantly when a new vulnerability is
              detected?
            </AccordionTrigger>
            <AccordionContent className="sm:text-md text-sm">
              Yes! With our Standard and Premium plans, you receive instant
              email notifications as soon as we detect a vulnerability in any of
              your monitored products, keeping you informed in real-time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="sm:text-lg text-md">
              How often are the vulnerability databases updated?
            </AccordionTrigger>
            <AccordionContent className="sm:text-md text-sm">
              Our system updates vulnerability databases frequently to ensure
              you receive the latest security information relevant to your
              monitored products.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="sm:text-lg text-md">
              What&rsquo;s the difference between the &ldquo;Check Now&rdquo;
              feature and regular scans?
            </AccordionTrigger>
            <AccordionContent className="sm:text-md text-sm">
              Our regular scans run automatically at set intervals (e.g., every
              24 hours, 6 hours, or hourly, depending on your plan). The
              &quot;Check Now&quot; feature allows you to manually trigger a
              scan on-demand, ideal when you need the latest data right away.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
