import {SafeAreaView, ScrollView, StyleSheet, Text, } from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, } from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';

export default function TermCondition(props) {
  const goToHome = props?.route?.params?.goToHome || false;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <NewHeader
          rightImage={false}
          navigation={props.navigation}
          title={'Terms of Service'}
          goToHome={goToHome}
        />

        <Text style={styles.text}>
          Thank you for using{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue!</Text>
          {'\n'}
          {'\n'}
          These Terms of Service (“Terms”) are a binding legal agreement between
          you and{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          that govern your use of the websites, applications, and other
          offerings from{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          (collectively, the “
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform”). When used in these Terms, “
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>,”
          “we,” “us,” or “our” refers to the{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          entity M/s.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
          Trading LLC with whom you are contracting.{'\n'}
        </Text>

        <Text style={styles.bold}>1. Your Acceptance </Text>
        <Text style={styles.text}>
          By using or visiting the web portal https://neroavenue.com and NERO
          mobile application of M/s.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          Trading LLC or any of M/s{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          Trading LLC’s mobile applications, products, software, data feeds, and
          services provided to you on, from, or through the
          https://neroavenue.com website or application services (collectively
          the "Service") you signify your agreement to these terms and
          conditions (the "Terms of Service). If you do not agree to any of
          these terms, please do not use the Service. Although we may attempt to
          notify you when major changes are made to these Terms of Service, you
          should periodically review the most up-to-date version available at
          https://neroavenue.com. M/s.
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Trading LLC may, in its sole discretion, modify or revise these Terms
          of Service and policies at any time, and you agree to be bound by such
          modifications or revisions. Nothing in these Terms of Service shall be
          deemed to confer any third-party rights or benefits.{' '}
        </Text>

        <Text style={styles.bold}>2. Service </Text>
        <Text style={styles.text}>
          These Terms of Service apply to all users of the Service, including
          the Collectors or buyers and contributors on the platform. The Service
          includes all aspects of M/s.
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Trading LLC, including but not limited to all products, software and
          services offered via the https://neroavenue.com website or mobile
          application/s platforms, provides a platform for like-minded people
          across all disciplines like Arts, Architecture & allied fields,
          Product Design, Graphic Design, Photography, Fashion and Engineering
          Design to connect with creators and enthusiasts for collection and
          contribution of arts. Registered users of our Services are “Members”
          and unregistered users are “Visitors”. When you register and join the
          https://neroavenue.com Services, you become a Member. If you have
          chosen not to register for our Services, you may access certain
          features as a “Visitor.”{'\n'}
          {'\n'}The{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          Platform offers an online venue that enables users (“Members”) to
          publish, offer, search for, and purchases either digitally or physical
          copies of the arts listed on{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
          Platform. Members who publish and offer services are “Contributors”
          and Members who search for, purchases, or use services are “Collectors
          or buyers”. You must register an account to access and use many
          features of the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform, and must keep your account information accurate. As the
          provider of the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform,
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          does not own, control, offer or manage any Listings.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text> is
          not a party to the contracts concluded directly between Contributors
          and Collectors or buyers, nor is{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text> an
          art broker or insurer.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text> is
          not acting as an agent in any capacity for any Member, except as
          specified in the Payments Terms of Service (“Payment Terms”).
        </Text>
        <Text style={styles.bold}>3. Membership Eligibility </Text>
        <Text style={styles.text}>
          Transaction on the Platform is available only to persons who can form
          legally binding contracts under Law. Persons who are "incompetent to
          contract" within the meaning of the respective law of the territory
          including un-discharged insolvents etc. are not eligible to use the
          Platform. If you are a minor (As per jurisdiction of your
          country)/under the age of 13 years, you may use the Platform or access
          content on the Platform only under the supervision and prior consent/
          permission of a parent or legal guardian.{'\n'}
          {'\n'}As a minor if you wish to transact on the Platform, such
          transaction on the Platform may be made by your legal guardian or
          parents.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          reserves the right to terminate your membership and / or refuse to
          provide you with access to the Platform if it is brought to{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>’s
          notice or if it is discovered that You are under the age of 13 years
          and transacting on the Platform.
        </Text>

        <Text style={styles.bold}>4.0 TERMS FOR COLLECTORS OR BUYERS:</Text>
        <Text style={styles.text}>
          Our mission is to create a Platform that connects creators and
          enthusiasts of Art. Art in any form is priceless and it withstands
          time.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          cuts across all disciplines like Arts, Architecture & allied fields,
          Product Design, Graphic Design, Photography, Fashion and Engineering
          Design to connect with creators and enthusiasts. The key
          differentiator is that it deals with all black or shades of black. The
          platform houses art , art related products and lifestyle products for
          NERO enthusiasts.
        </Text>

        <Text style={styles.bold}>4. Searching Art works and purchasing. </Text>
        <Text style={styles.bold}>
          4.1 Searching.{' '}
          <Text style={styles.text}>
            You can search for type of art by using criteria like the Arts,
            Architecture & allied fields, Product Design, Graphic Design,
            Photography, Fashion and Engineering Design etc.,. You can also use
            filters to refine your search results. Search results are based on
            their relevance to your search and other criteria. Relevance
            considers factors like price, availability, Reviews and cancellation
            history, popularity, previous purchases and saved Listings etc,.
          </Text>
        </Text>

        <Text style={styles.bold}>
          4.2 Purchasing/Collecting.{' '}
          <Text style={styles.text}>
            When you book a Listing, you are agreeing to pay all charges for
            your booking including the Listing price, applicable fees like {' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue's</Text>{' '}
            service fee, offline fees, taxes, and any other items identified
            during checkout (collectively, “Total Price”). You are also agreeing
            that{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may charge and collect any security deposit identified during
            checkout. When you receive the booking confirmation, a contract for
            Contributors product/Services is formed directly between you and the
            Contributors. The cancellation/return policy and any other rules,
            standards, policies, or requirements identified in the Listing or
            during checkout form part of your contract with the Contributors. Be
            aware that some Contributors work with a co- Contributors or as part
            of a team to provide their Contributors products/services.
          </Text>
        </Text>

        <Text style={styles.bold}>
          4.3 Orders –{' '}
          <Text style={styles.text}>
            At present{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform offers the following placement of orders:{'\n'}
            {'\n'}a. Subscription for Art Gallery Viewing{'\n'}
            {'\n'}
            b. On demand printing of the Art on various items (Including but not
            limited to Paper, wood, Metal (Gold, Silver, Steel etc.,) Plates
            {'\n'}
            {'\n'}
            c. Place orders for Art works listed{'\n'}
            {'\n'}
            When you place an order on our{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform, your order is considered an offer to{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.
            The latter therefore reserves the right to refuse your order at any
            time for any reason, including the non-availability of products
            ordered in your area, if products are incorrectly described on your
            order or if there is an error with our prices on{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform.{'\n'}
            {'\n'}
            On Subscription of art Gallery, you will provide access the art
            gallery which also provides you to shortlist your own gallery of art
            works and customize the viewing.{'\n'}
            {'\n'}
            You can also order our on demand Printing Services of the Art work
            that you intend to get printed and delivered to your address or Gift
            to your loved ones. On demand printing services are provided subject
            to availability of the printing and required material in your
            jurisdiction. On demand printing services are offered to get the
            selected Art work printed on various materials including but not
            limited to Paper, Cardboards, Wood and Metal.{'\n'}
            {'\n'}
            Further you can also place orders to the products listed on the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform.{'\n'}
            {'\n'}
            If your order is accepted, you will receive a confirmation to that
            effect. Otherwise, you will receive an email stating that your order
            has been cancelled or denied.{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            accepts hereby to refund any amount paid by you on the cancelled or
            refused order.{'\n'}
            {'\n'}Finally, you are responsible for the applicable sales taxes
            (federal and provincial), the purchase of products, delivery charges
            and, where applicable, the costs of customs and any other applicable
            tax in such matters.
          </Text>
        </Text>

        <Text style={styles.bold}>
          4.4 Delivery
          <Text style={styles.text}>
            Subject to the preceding article (Orders),{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            is responsible for delivering your order according to the delivery
            method chosen. All orders are a shipping fee, applicable sales taxes
            (federal and provincial), delivery charges and, where applicable,
            the costs of customs and any other applicable tax and are provided
            in the checkout form while placing the order.
          </Text>
        </Text>

        <Text style={styles.bold}>
          5. Cancellations, Purchase Issues, Refunds and Modifications.
        </Text>
        <Text style={styles.bold}>
          5.1 Cancellations, Purchase Issues, and Refunds.
          <Text style={styles.text}>
            In general, if as a Collectors or buyers you cancel an order, the
            amount refunded to you is determined by the cancellation ` that
            applies to that order. But, in certain situations, other policies
            take precedence and determine what amount is refunded to you. If
            something outside your control forces you to cancel an order, you
            may be eligible for a partial or full refund under our Extenuating
            Circumstances Policy. If the Contributors cancel you may be eligible
            for re-ordering assistance or a partial or full refund under the 
            Collectors or buyers Refund Policy. Different policies apply to
            certain categories of Listings.
          </Text>
        </Text>

        <Text style={styles.bold}>
          5.2 Order Modifications.
          <Text style={styles.text}>
            Collectors or buyers and Contributors are responsible for any order
            modifications they agree to make via the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform or direct{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            customer service to make on their behalf ("Order Modifications"),
            and agree to pay any additional amounts, fees, or taxes associated
            with any Order Modification.
          </Text>
        </Text>

        <Text style={styles.bold}>
          5.3 Satisfaction of our products returns and refunds:{' '}
          <Text style={styles.text}>
            For any return or refund request, please contact us by email
            at contact@neroavenue.com making sure to indicate your order number
            and a short explanation of your dissatisfaction about our product.
            {'\n'} {'\n'}
            If the product does not comply with your order (quality issues,
            wrong reference received, defective packaging etc.,) please submit
            your refund request within 3 days of receiving your order. Refunds
            will be processed within 15 to 30 working days normally, however
            would take longer days based on the jurisdiction from where your
            ordered following the receipt of the returned products, if the
            conditions are respected, on the same method of payment used when
            ordering. {'\n'}
            {'\n'}
            We will not accept refund requests if the returned bag is opened,
            except in the case of an obvious product defect.
          </Text>
        </Text>

        <Text style={styles.bold}>
          6. Your Responsibilities and Assumption of Risk:
          <Text style={styles.text}>
            You acknowledge that many activities carry inherent risks and agree
            that, to the maximum extent permitted by applicable law, you assume
            the entire risk arising out of your access to and use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform and any Content, including your participation in any
            Experience, use of any other Contributors products/Service, or any
            other interaction you have with other Members whether in person or
            online. This means it is your responsibility to investigate a
            Contributors Products/Service to determine whether it is suitable
            for you.
          </Text>
        </Text>

        <Text style={styles.bold}>TERMS FOR CONTRIBUTORS </Text>

        <Text style={styles.bold}>
          7. Contributors on{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.{' '}
        </Text>
        <Text style={styles.bold}>
          7.1 Contributors.{' '}
          <Text style={styles.text}>
            As Contributors,{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            offers you the opportunity to connect, share and sell your creative
            works of different verticals such as Photographs, Architect designs,
            Fashion Designs, Painting, Art work, Experiences, or other
            products/Service with our vibrant community of Collectors or buyers
            - and earn money doing it. It’s easy to create a Listing and you are
            in control of how you host - set your price, availability, and rules
            for each Listing.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          7.2 Contracting with{' '}
          <Text style={styles.text}>
            Collectors or buyers. When you accept an Order request, or receive
            an order confirmation through the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform, you are entering into a contract directly with the
            Collectors or buyers, and are responsible for delivering your
            Product/Service under the terms and at the price specified in your
            Listing. You are also agreeing to pay applicable fees like 
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            ’s service fee (and applicable taxes) for each such order.{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Payments will deduct amounts you owe from your payout unless we and
            you agree to a different method. Any terms, policies or conditions
            that you include in any supplemental contract with Collectors and
            Buyers must: (i) be consistent with these Terms, our Policies, and
            the information provided in your Listing, and (ii) be prominently
            disclosed in your Listing description.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          7.3 Independence of Contributors.{' '}
          <Text style={styles.text}>
            Your relationship with{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            is that of an independent individual or entity and not an employee,
            agent, joint venture, or partner of{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>,
            except that{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Payments acts as a payment collection agent as described in the
            Payments Terms.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            does not direct or control your Contributors products/Service, and
            you agree that you have complete discretion whether and when to
            provide Contributors products/Services, and at what price and on
            what terms to offer them.
          </Text>
        </Text>

        <Text style={styles.bold}>8. Managing Your Listing. </Text>
        <Text style={styles.bold}>
          8.1 Creating and Managing Your Listing.
          <Text style={styles.text}>
            The{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform provides tools that make it easy for you to set up and
            manage a Listing. Your Listing must include complete and accurate
            information about your Products/Service, your price, does and don’ts
            and any rules or requirements that apply to your Collectors and
            Buyers or Listing. You are responsible for keeping your Listing
            information such as exclusivity, limited editions, and content (like
            photos) up-to-date and accurate at all times. We recommend that you
            obtain appropriate insurance for your Contributions and suggest you
            carefully review policy terms and conditions including coverage
            details and exclusions. You may only maintain one Listing per work.
          </Text>
        </Text>

        <Text style={styles.bold}>
          8.2 Your listings{' '}
          <Text style={styles.text}>
            As a registered Contributor, you are allowed to list item(s) for
            sale on the Platform in accordance with the Policies which are
            incorporated by way of reference in this Terms of Use. You must be
            legally able to sell the item(s) you list for sale on{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            Platform. You must ensure that the listed items do not infringe upon
            the intellectual property, trade secret or other proprietary rights
            or rights of publicity or privacy rights of third parties. Listings
            may only include text descriptions, graphics and pictures that
            describe your item for sale. All listed items must be listed in an
            appropriate category on the Platform. All listed items must be kept
            in stock for successful fulfillment of sales. The listing
            description of the item must not be misleading and must describe
            actual condition of the product. If the item description does not
            match the actual condition of the item, you agree to refund any
            amounts that you may have received from the Collectors and Buyers.
            You agree not to list a single product in multiple quantities across
            various categories on the Platform.{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            reserves the right to delete such multiple listings of the same
            product listed by you in various categories.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          8.3 Know Your Legal Obligations.{' '}
          <Text style={styles.text}>
            You are responsible for understanding and complying with any laws,
            rules, regulations, and contracts with third parties that apply to
            your Listing or Services. For example: Some jurisdictions require
            that you register Collectors or Buyer who purchase your work. Check
            your local rules to learn what rules apply to the Products/Services
            you plan to offer. Information we provide regarding legal
            requirements is for informational purposes only and you should
            independently confirm your obligations. If you have questions about
            how local laws apply you should always seek legal advice.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          8.4 Your Responsibilities.{' '}
          <Text style={styles.text}>
            You are responsible and liable for your own acts and omissions and
            are also responsible for the acts and omissions of anyone you allow
            to participate in providing your Contribution Products/Services. You
            are responsible for setting your price and establishing rules and
            requirements for your Listing. You must describe any and all fees
            and charges in your Listing description and may not collect any
            additional fees or charges outside the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform except those expressly authorized by our Offline Fee
            Policy. Do not encourage Collectors or Buyers to create third-party
            accounts, submit reviews, provide their contact information, or take
            other actions outside the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform in violation of our Off-Platform Policy.
            {'\n'}Refer to criteria’s that will let your art into the platform
            and our art review policy.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          8.5 Contributions as a Team or Organization.{' '}
          <Text style={styles.text}>
            If you work with a co-Contributor or Contribute as part of a team,
            business, or other organization, the entity and each individual who
            participates in providing Products/Services is responsible and
            liable as a Contributors under these Terms. If you accept terms or
            enter into contracts, you represent and warrant that you are
            authorized to enter into contracts for and bind your team, business
            or other organization, and that each entity you use is in good
            standing under the laws of the place where it is established. If you
            perform other functions, you represent and warrant that you are
            authorized to perform those functions.
          </Text>
        </Text>

        <Text style={styles.bold}>
          8.6 Your Assumption of Risk.{' '}
          <Text style={styles.text}>
             You acknowledge that Contributors carries inherent risks and agree
            that you assume the entire risk arising out of your access to and
            use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform, offering of Products/Services, or any interaction you have
            with other Members whether in person or online. You agree that you
            have had the opportunity to investigate the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform and any laws, rules, regulations, or obligations that may
            be applicable to your Listings or Products/Services and that you are
            not relying upon any statement of law made by{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>9. Taxes. </Text>
        <Text style={styles.bold}>
          {' '}
          9.1 Contributor’s Taxes.{' '}
          <Text style={styles.text}>
             You acknowledge that Contributors carries inherent risks and agree
            that you assume the entire risk arising out of your access to and
            use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform, offering of Products/Services, or any interaction you have
            with other Members whether in person or online. You agree that you
            have had the opportunity to investigate the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform and any laws, rules, regulations, or obligations that may
            be applicable to your Listings or Products/Services and that you are
            not relying upon any statement of law made by{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          9.2 Collection and Remittance by{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.{' '}
          <Text style={styles.text}>
            In jurisdictions where{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            facilitates the collection and/or remittance of Taxes on behalf of
            Contributors, you instruct and authorize{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            to collect Taxes on your behalf, and/or to remit such Taxes to the
            relevant Tax authority. Any Taxes that are collected and/or remitted
            by{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            are identified to Members on their transaction records, as
            applicable.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may seek additional amounts from Members (including by deducting
            such amounts from future payouts) in the event that the Taxes
            collected and/or remitted are insufficient to fully discharge that
            Members’ tax obligations, and you agree that your sole remedy for
            Taxes collected by{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            is a refund from the applicable Tax authority. You acknowledge and
            agree that we retain the right, with prior notice to affected
            Members, to cease the collection and remittance of Taxes in any
            jurisdiction for any reason.
          </Text>
        </Text>

        <Text style={styles.bold}>
          9.3 Tax Information.{' '}
          <Text style={styles.text}>
            In certain jurisdictions, Tax regulations may require that we
            collect and/or report Tax information about you, or withhold Taxes
            from payouts to you, or both. If you fail to provide us with
            documentation that we determine to be sufficient to support any such
            obligation to withhold Taxes from payouts to you, we may withhold
            payouts up to the amount as required by law, until sufficient
            documentation is provided. You agree that{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may issue on your behalf invoices or similar documentation for VAT,
            GST, consumption or other Taxes for your Products/Services to
            facilitate accurate tax reporting by you, our Collectors/Buyer
            members, and/or their organizations.
          </Text>
        </Text>

        <Text style={styles.bold}>General Terms </Text>

        <Text style={styles.bold}>
          10. Content License/s.{' '}
          <Text style={styles.text}>
            Parts of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform enable you to provide Art work, feedback, text, photos,
            audio, video, information, and other content (collectively,
            “Content”). By providing Content, in whatever form and through
            whatever means, you grant{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text> a
            non-exclusive, worldwide, royalty-free, irrevocable, perpetual,
            sub-licensable and transferable license to copy, modify, prepare
            derivative works of, distribute, publish and otherwise exploit, that
            Content, without limitation. Where{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            pays for the creation of Content or facilitates its creation,{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may own that Content, in which case supplemental terms or
            disclosures will say that. You are solely responsible for all
            Content that you provide and warrant that you either own it or are
            authorized to grant{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            the rights described in these Terms. You are responsible and liable
            if any of your Content violates or infringes the intellectual
            property or privacy rights of any third party. Content must comply
            with our Content Policy and Non-discrimination Policy, which
            prohibit, among other things, discriminatory, obscene, harassing,
            deceptive, violent, and illegal content. You agree that{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may make available products/services or automated tools to transform
            Content and that your Content may be transformed/translated using
            such services or tools.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            does not guarantee the accuracy or quality of transformation/
            translations and Members are responsible for confirming the accuracy
            of such transformation /translations.
          </Text>
        </Text>

        <Text style={styles.bold}>
          11. Fees.
          <Text style={styles.text}>
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may charge fees (and applicable Taxes) to Contributors and
            Collectors/Buyers for use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform. More information about when service fees apply and how
            they are calculated can be found on our Service Fees page
            (Subscription Page). Except as otherwise provided on the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform, service fees are non-refundable.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            `reserves the right to change the service fees at any time, and will
            provide Members notice of any fee changes before they become
            effective. Fee changes will not affect orders placed prior to the
            effective date of the fee change. If you disagree with a fee change
            you may terminate this agreement at any time. Refer Our Gallery Fee
            chart ( separate Chart ){' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          12. <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          Platform Rules. ( guide as separate Chart){' '}
        </Text>

        <Text style={styles.bold}>
          12.1 Rules.{' '}
          <Text style={styles.text}>
            You must follow these rules and must not help or induce others to
            break or circumvent these rules.{' '}
          </Text>
        </Text>
        <Text style={styles.text}>
          Act with integrity and treat others with respect
          {'\n'}
          {'\n'}
          Do not lie, misrepresent something or someone, or pretend to be
          someone else.
          {'\n'}
          Be polite and respectful when you communicate or interact with others.
          {'\n'}
          Follow our Non-discrimination Policy and do not discriminate against
          or harass others.
          {'\n'}
          Do not scrape, hack, reverse engineer, compromise or impair the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform
          {'\n'}
          {'\n'}
          Do not use bots, crawlers, scrapers, or other automated means to
          access or collect data or other content from or otherwise interact
          with the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform.
          {'\n'}
          Do not hack, avoid, remove, impair, or otherwise attempt to circumvent
          any security or technological measure used to protect the{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
          Platform or Content.
          {'\n'}
          Do not decipher, decompile, disassemble, or reverse engineer any of
          the software or hardware used to provide the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform.
          {'\n'}
          Do not take any action that could damage or adversely affect the
          performance or proper functioning of the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform.
          {'\n'}
          Only use the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform as authorized by these Terms or another agreement with us
          {'\n'}
          {'\n'}
          You may only use another Member’s personal information as necessary to
          facilitate a transaction using the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform as authorized by these Terms.
          {'\n'}
          Do not use the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform, our messaging tools, or Members’ personal information to
          send commercial messages without the recipient’s express consent.
          {'\n'}
          You may use Content made available through the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform solely as necessary to enable your use of the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform as a Collectors/Buyers or Contributors.
          {'\n'}
          Do not use Content unless you have permission from the Content owner
          or the use is authorized by us in these Terms or another agreement you
          have with us.
          {'\n'}
          Do not request, make, or accept any order or any payment outside of
          the <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform to avoid paying fees, taxes or for any other reason.
          {'\n'}
          Do not require or encourage Collectors/Buyers to open an account,
          leave a review, complete a survey, or otherwise interact, with a third
          party website, application or service before, during or after a
          purchase, unless authorized by{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.
          {'\n'}
          Do not engage in any practices that are intended to manipulate our
          search algorithm.
          {'\n'}
          Do not book Contributors Products/Services unless you are actually
          using the Contributors Services. {'\n'}
          {'\n'}
          Do not use, copy, display, mirror or frame the{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          Platform, any Content, any{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          branding, or any page layout or design without our consent. {'\n'}
          {'\n'}
          Honor your legal obligations
          {'\n'}
          {'\n'}
          Understand and follow the laws that apply to you, including privacy,
          data protection, and export laws.
          {'\n'}If you provide us with someone else’s personal information, you:
          (i) must do so in compliance with applicable law, (ii) must be
          authorized to do so, and (iii) authorize us to process that
          information under our Privacy Policy. {'\n'}
          {'\n'}Read and follow our Terms,Policies and Standards.
          {'\n'}Do not use the name, logo, branding, or trademarks of{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text> or
          others without permission. {'\n'}
          Do not use or register any domain name, social media handle, trade
          name, trademark, branding, logo, or other source identifier that may
          be confused with{' '}
          <Text style={{fontFamily: fontConstant.black}}>
            {' '}
            NERO avenue
          </Text>{' '}
          branding.
          {'\n'}
          Do not offer Products/Services that violate the laws or agreements
          that apply to you.
        </Text>

        <Text style={styles.bold}>
          12.2 Reporting Violations.
          <Text style={styles.text}>
            If you believe that a Member, Listing or Content poses an imminent
            risk of harm to a person or property, you should immediately contact
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            before approaching local authorities. In addition, if you believe
            that a Member, Listing or Content has violated our Standards, you
            should report your concerns to{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.
            If you reported an issue to local authorities,{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may request a copy of that report. Except as required by law, you
            agree that we are not obligated to take action in response to any
            report.
          </Text>
        </Text>

        <Text style={styles.bold}>
          12.3 Copyright Notifications.
          <Text style={styles.text}>
            If you believe that Content on the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform infringes copyrights, please notify us at
            contact@neroavenue.com we will review your claims and go through the
            documents submitted by you, before taking a decision of take down.
            Until the ownership is under dispute, we suspend monetizing of the
            said content by the respective Contributor and keep the proceeds in
            escrow account and the same will be settled on clearance of the
            ownership by either settlement between parties or by court final
            orders.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          13. Termination, Suspension and other Measures.{' '}
        </Text>
        <Text style={styles.bold}>
          13.1 Term.
          <Text style={styles.text}>
            The agreement between you and{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            reflected by these Terms is effective when you access the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform (for example to create an account) and remains in effect
            until either you or we terminate the agreement in accordance with
            these Terms.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          13.2 Termination.{' '}
          <Text style={styles.text}>
            You may terminate this agreement at any time by sending us an
            email or by deleting your account.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may terminate this agreement and your account for any reason by
            giving you 30 days’ notice via email or using any other contact
            information you have provided for your account.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may also terminate this agreement immediately and without notice and
            stop providing access to the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform if you breach these Terms, you violate our Policies, you
            violate applicable laws, or we reasonably believe termination is
            necessary to protect{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>,
            its Members, or third parties. If your account has been inactive for
            more than two years, we may terminate your account without prior
            notice.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          13.3 Member Violations.{' '}
          <Text style={styles.text}>
            If (i) you breach these Terms, our Policies, or our Standards, (ii)
            you violate applicable laws, regulations, or third-party rights, or
            (iii){' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            believes it is reasonably necessary to protect
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>,
            its Members, or third parties;{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            may, with or without prior notice:
            {'\n'}
            suspend or limit your access to or use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform and/or your account;
            {'\n'}
            suspend or remove Listings, Reviews, or other Content;
            {'\n'}
            cancel pending or confirmed Orders; or
            {'\n'}
            suspend or revoke any special status associated with your account.
            {'\n'}
            For minor violations or where otherwise appropriate as{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            determines in its sole discretion, you will be given notice of any
            intended measure by{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            and an opportunity to resolve the issue. You may appeal actions
            taken by us under this Section by contacting customer service. If an
            order is cancelled under this Section, the amount paid to the
            Contributors will be reduced by the amount we refund or otherwise
            provide to the Collectors/Buyers, and by any other costs we incur as
            a result of such cancellation.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          13.4 Legal Mandates.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          <Text style={styles.text}>
            may take any action it determines is reasonably necessary to comply
            with applicable law, or the order or request of a court, law
            enforcement, or other administrative agency or governmental body,
            including the measures described above in Section 13.3. 13.5 Effect
            of Termination. If you are a Host and terminate your account, any
            confirmed Order(s) will be automatically cancelled and your
            Collectors/Buyers will receive a full refund. If you terminate your
            account as a Collectors/Buyers, any confirmed Order(s) will be
            automatically cancelled and any refund will depend upon the terms of
            the listing of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            as provided in this agreement. When this agreement has been
            terminated, you are not entitled to a restoration of your account or
            any of your Content. If your access to or use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform has been limited, or your{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            account has been suspended, or this agreement has been terminated by
            us, you may not register a new account or access or use the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform through an account of another Member.
          </Text>
        </Text>

        <Text style={styles.bold}>
          13.6 Survival.
          <Text style={styles.text}>
            Parts of these Terms that by their nature survive termination, will
            survive termination of this agreement.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>14. Modification.</Text>
        <Text style={styles.bold}>
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
          <Text style={styles.text}>
            may modify these Terms at any time. When we make material changes to
            these Terms, we will post the revised Terms on the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            Platform and update the “Last Updated” date at the top of these
            Terms. We will also provide you with notice of any material changes
            by email at least 30 days before the date they become effective. If
            you disagree with the revised Terms, you may terminate this
            agreement immediately as provided in these Terms. If you do not
            terminate your agreement before the date the revised Terms become
            effective, your continued access to or use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            Platform will constitute acceptance of the revised Terms.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          15. Resolving Complaints and Damage Claims.{' '}
          <Text style={styles.text}>
            If the complaining Member escalates a Damage Claim to{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>,
            the other Member (Contributor) will be given an opportunity to
            respond. If the responding Member agrees to pay, or{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            determines in its sole discretion that they are responsible for the
            Damage Claim,{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            via{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Payments can collect any sums required to cover the Damage Claim
            from the responding Member and/or against any security deposit. You
            agree that{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            may seek to recover from you under any insurance policies you
            maintain and that{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            may also pursue against you any remedies it may have available under
            applicable law. You agree to cooperate in good faith, provide any
            information{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            requests, execute documents, and take further reasonable action, in
            connection with Damage Claims, Member complaints, claims under
            insurance policies, or other claims related to your provision or use
            of Products/Services.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          17. Member Accounts.{' '}
          <Text style={styles.text}>
            You must register an account to access and use many features of the
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform. Registration is only permitted for legal entities,
            partnerships and natural persons who are 13 years or older. You
            represent and warrant that you are not a person or entity barred
            from using the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform under the laws of the territory where you
            resident/domiciled, your place of residence, or any other applicable
            jurisdiction. You must provide accurate, current, and complete
            information during registration and keep your account information
            up-to-date. You may not register more than one account or transfer
            your account to someone else. You are responsible for maintaining
            the confidentiality and security of your account credentials and may
            not disclose your credentials to any third party. You are
            responsible and liable for activities conducted through your account
            and must immediately notify{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            if you suspect that your credentials have been lost, stolen, or your
            account is otherwise compromised. If and as permitted by applicable
            law, we may, but have no obligation to (i) ask you to provide
            identification or other information, (ii) undertake checks designed
            to help verify your identity or background, (iii) screen you against
            third-party databases or other sources and request reports from
            service providers, and (iv) obtain reports from public records of
            criminal convictions or their local equivalents.
          </Text>
        </Text>

        <Text style={styles.bold}>
          18. Disclaimer of Warranties.{' '}
          <Text style={styles.text}>
            We provide the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform and all Content “as is” without warranty of any kind and we
            disclaim all warranties, whether express or implied. For example:
            (i) we do not endorse or warrant the existence, conduct,
            performance, safety, quality, legality or suitability of any
            Collectors/Buyers, Contributors, Products/Service, Listing or third
            party; (ii) we do not warrant the performance or non-interruption of
            the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform; and (iii) we do not warrant that verification, identity or
            background checks conducted on Listings or Members (if any) will
            identify past misconduct or prevent future misconduct. Any
            references to a Member or Listing being "verified" (or similar
            language) indicate only that the Member or Listing or{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            has completed a relevant verification or identification process and
            nothing else. The disclaimers in these Terms apply to the maximum
            extent permitted by law. If you have statutory rights or warranties
            we cannot disclaim, the duration of any such statutorily required
            rights or warranties, will be limited to the maximum extent
            permitted by law.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          19. Limitations on Liability.{' '}
          <Text style={styles.text}>
            Neither{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            (including its affiliates and personnel) nor any other party
            involved in creating, producing, or delivering the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            Platform or any Content will be liable for any incidental, special,
            exemplary or consequential damages, including lost profits, loss of
            data or loss of goodwill, service interruption, computer damage or
            system failure or the cost of substitute products or services, or
            for any damages for personal or bodily injury or emotional distress
            arising out of or in connection with (i) these Terms, (ii) the use
            of or inability to use the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform or any Content, (iii) any communications, interactions or
            meetings you may have with someone you interact or meet with
            through, or as a result of, your use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform, or (iv) publishing or Purchasing of a Listing, including
            the provision or use of Products/Services, whether based on
            warranty, contract, tort (including negligence), product liability
            or any other legal theory, and whether or not{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            has been informed of the possibility of such damage, even if a
            limited remedy set out in these Terms is found to have failed of its
            essential purpose.
            {'\n'}
            Except for our obligation to transmit payments to Contributors under
            these Terms, or make payments under the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Contributors Guarantee or Contributors Insurance, in no event will{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            ‘s aggregate liability for any claim or dispute arising out of or in
            connection with these Terms, your interaction with any Members, or
            your use of or inability to use the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform, any Content, or any Products/Service, exceed one hundred
            U.S. dollars (US$100).
            {'\n'}
            These limitations of liability and damages are fundamental elements
            of the agreement between you and{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>.
            If applicable law does not allow the limitations of liability set
            out in these Terms, the above limitations may not apply to you.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          20. Indemnification.
          <Text style={styles.text}>
            To the maximum extent permitted by applicable law, you agree to
            release, defend (at{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            ’s option), indemnify, and hold{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            (including{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Payments, other affiliates, and their personnel) harmless from and
            against any claims, liabilities, damages, losses, and expenses,
            including, without limitation, reasonable legal and accounting fees,
            arising out of or in any way connected with: (i) your breach of
            these Terms (including any supplemental or additional terms that
            apply to a product or feature) or our Policies or Standards, (ii)
            your improper use of the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform, (iii) your interaction with any Member, using the
            products/services, participation in an Experience or other Service,
            including without limitation any injuries, losses or damages
            (whether compensatory, direct, incidental, consequential or
            otherwise) of any kind arising in connection with or as a result of
            such interaction, participation or use, (iv) your failure, or our
            failure at your direction, to accurately report, collect or remit
            Taxes, or (v) your breach of any laws, regulations or third party
            rights such as intellectual property or privacy rights.
          </Text>
        </Text>

        <Text style={styles.bold}>
          21. Dispute Resolution, Venue and Forum, and Governing Law.
          <Text style={styles.text}>
            The Terms will be interpreted in accordance with UAE law. The
            application of the United Nations Convention on Contracts for the
            International Sale of Goods (CISG) is excluded. The choice of law
            does not impact your rights as a consumer according to the consumer
            protection regulations of your country of residence. If you are
            acting as a consumer, you agree to submit to the non-exclusive
            jurisdiction of the UAE courts. Legal proceedings that you are able
            to bring against us arising from or in connection with these Terms
            may only be brought in a court located in UAE. If{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            wishes to enforce any of its rights against you as a consumer, we
            may do so only in the courts of the jurisdiction in which you are a
            resident. If you are acting as a business, you agree to submit to
            the exclusive jurisdiction of the UAE courts.
          </Text>
        </Text>

        <Text style={styles.bold}>
          22. No Waiver.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>’s{' '}
          <Text style={styles.text}>
            failure to enforce any right or provision in these Terms will not
            constitute a waiver of such right or provision unless acknowledged
            and agreed to by us in writing. Except as expressly set forth in
            these Terms, the exercise by either party of any of its remedies
            under these Terms will be without prejudice to its other remedies
            under these Terms or otherwise permitted under law.
          </Text>
        </Text>

        <Text style={styles.bold}>
          23. Assignment.{' '}
          <Text style={styles.text}>
            You may not assign, transfer or delegate this agreement or your
            rights and obligations hereunder without{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            ’s prior written consent.{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            may without restriction assign, transfer or delegate this agreement
            and any rights and obligations hereunder, at its sole discretion,
            with 30 days’ prior notice.{' '}
          </Text>
        </Text>
        <Text style={styles.bold}>
          24. Notice.{' '}
          <Text style={styles.text}>
            Unless specified otherwise, any notices or other communications to
            Members permitted or required under this agreement, will be provided
            electronically and given by{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            via email,{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            Platform notification, messaging service (including SMS, Whatsup or
            any other means suitable), or any other contact method we enable and
            you provide. If a notification relates to a Orders or Listing, you
            agree and acknowledge that such notifications via electronic means
            in lieu of a written statement.{' '}
          </Text>{' '}
        </Text>

        <Text style={styles.bold}>
          25. Third-Party Services.{' '}
          <Text style={styles.text}>
            The{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform may contain links to third-party websites, applications,
            services or resources (“Third-Party Services”) that are subject to
            different terms and privacy practices.{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            is not responsible or liable for any aspect of such Third-Party
            Services and links to such Third-Party Services are not an
            endorsement.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          26. <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          Platform Content.{' '}
          <Text style={styles.text}>
            Content made available through the{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
            Platform may be protected by copyright, trademark, and/or other laws
            of the UAE and other countries. You acknowledge that all
            intellectual property rights for that Content are the exclusive
            property of{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            and/or its licensors and agree that you will not remove, alter or
            obscure any copyright, trademark, service mark or other proprietary
            rights notices. You may not use, copy, adapt, modify, prepare
            derivative works of, distribute, license, sell, transfer, publicly
            display, publicly perform, transmit, broadcast or otherwise exploit
            any Content accessed through the{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform except to the extent you are the legal owner of that
            Content or as expressly permitted in these Terms. Subject to your
            compliance with these Terms,{' '}
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            grants you a limited, non-exclusive, non-sublicensable, revocable,
            non-transferable license to (i) download and use the Application on
            your personal device(s); and (ii) access and view the Content made
            available on or through the
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            Platform and accessible to you, solely for your personal and
            non-commercial use.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          27. Force Majeure.{' '}
          <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>{' '}
          <Text style={styles.text}>
            shall not be liable for any delay or failure to perform resulting
            from causes outside its reasonable control, including, but not
            limited to, acts of God, natural disasters, war, terrorism, riots,
            embargoes, acts of civil or military authorities, fire, floods,
            accidents, pandemics, epidemics or disease, strikes or shortages of
            transportation facilities, fuel, energy, labor or materials.
          </Text>
        </Text>

        <Text style={styles.bold}>
          28. Emails and SMS.
          <Text style={styles.text}>
            You will receive administrative communications from us using the
            email address or other contact information you provide for your
            <Text style={{fontFamily: fontConstant.black}}>
              {' '}
              NERO avenue
            </Text>{' '}
            account. Enrollment in additional email subscription programs will
            not affect the frequency of these administrative emails, though you
            should expect to receive additional emails specific to the
            program(s) to which you have subscribed. You may also receive
            promotional emails from us. No fee is charged for these promotional
            emails, but third-party data rates could apply. You can control
            whether you receive promotional emails using the notification
            preferences in your account settings. Please note that you will not
            be able to take advantage of certain promotions if you disable
            certain communication settings or do not have an{' '}
            <Text style={{fontFamily: fontConstant.black}}> NERO avenue</Text>
            account.{' '}
          </Text>
        </Text>

        <Text style={styles.bold}>
          29. Contact Us.
          <Text style={styles.text}>
            If you have any questions about these Terms please email us at
             contact@neroavenue.com.
          </Text>
        </Text>

        <Text style={styles.text}>Last updated on: 01 Dec 2023</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  text: {
    color: colorConstant.white,
    width: responsiveScreenWidth(90),
    lineHeight: 19,
    fontFamily: fontConstant.light,
    alignSelf: 'center',
    marginVertical: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'justify',
  },
  headText: {
    color: colorConstant.white,
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(1),

    fontSize: responsiveScreenFontSize(2.5),
    fontFamily: fontConstant.bold,
    lineHeight: responsiveScreenHeight(4),
  },
  bold: {
    color: colorConstant.white,
    width: responsiveScreenWidth(95),
    lineHeight: 19,
    fontFamily: fontConstant.medium,
    alignSelf: 'center',
    marginVertical: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'justify',
  },
});
