import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ServicePage.css';
import '../styles/BlogPost.css';

const BlogPost = () => {
    const navigate = useNavigate();
    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
          // If not on homepage, navigate first then scroll
          navigate('/');
          setTimeout(() => {
            const element = document.querySelector(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        
      };
    
  const { slug } = useParams();
  const baseUrl = 'https://novatax.ca'; // Update with your domain

  const posts = {
    "Best-tax-Deductions-guide": {
      title: "The Best Tax Deductions and Credits for Canadians",
      date: "Feburary 18, 2025",
      category: "Tax Returns",
      author: "Nova Tax Team",
      content: `
        <h2>The Best Tax Deductions and Credits for Canadians</h2>
        
        <p>Tax season can be overwhelming, but taking advantage of the right deductions and credits can help you reduce your tax bill and maximize your refund. Here are some of the top tax-saving opportunities available to Canadians.</p>

        <h3>RRSP Contributions – Reduce Your Taxable Income</h3>
        <ul>
          <li>✅ Contributions to an RRSP lower your taxable income and grow tax-free until withdrawal.</li>
          <li>✅ The 2024 contribution limit is 18% of your income, up to $31,560, with unused room carrying forward from previous years.</li>
          <li>📌 Tip: If you expect to be in a higher tax bracket later, carry forward unused contributions for future tax savings.</li>
        </ul>

        <h3>TFSA – Tax-Free Investment Growth</h3>
        <ul>
          <li>✅ While contributions aren’t tax-deductible, investment growth and withdrawals are completely tax-free.</li>
          <li>✅ The 2024 limit is $7,000, with unused room carrying forward from previous years.</li>
          <li>📌 Tip: Use a TFSA for high-growth investments to avoid paying tax on capital gains.</li>
        </ul>

        <h3>Home Office Expenses – Deduction for Remote Workers</h3>
        <ul>
          <li>✅ If you work from home, you may be able to deduct part of your rent, utilities, and internet costs.</li>
          <li>✅ You must use the detailed method, calculating the percentage of your home used for work.</li>
          <li>📌 Tip: Keep all receipts and a T2200 form from your employer to support your claim.</li>
        </ul>

        <h3>Medical Expenses – Get a Tax Credit</h3>
        <ul>
          <li>✅ Includes prescriptions, dental, vision care, and medical travel costs.</li>
          <li>✅ Claim expenses over 3% of your net income or $2,759 (whichever is lower).</li>
          <li>📌 Tip: Combine medical expenses under the lower-income spouse’s tax return for maximum benefit.</li>
        </ul>

        <h3>Childcare Expenses – Reduce Your Taxable Income</h3>
        <ul>
          <li>✅ Claim costs for daycare, babysitters, and before/after-school programs.</li>
          <li>✅ Maximum claims: $8,000 per child under 7, $5,000 per child aged 7-16.</li>
          <li>📌 Tip: Payments must be made to licensed providers or documented caregivers to qualify.</li>
        </ul>

        <h3>Charitable Donations – Earn a Tax Credit</h3>
        <ul>
          <li>✅ Donations over $200 get a 29% federal tax credit (higher in some provinces and for those in the highest marginal tax bracket).</li>
          <li>✅ Donating stocks or securities instead of cash avoids capital gains tax.</li>
          <li>📌 Tip: You can carry forward unused donations for five years to maximize your tax savings in a high-income year.</li>
        </ul>

        <h3>First-Time Home Buyer’s Credit & Home Buyers' Plan</h3>
        <ul>
          <li>✅ Provides a $1,500 non-refundable tax credit to help with home purchase costs.</li>
          <li>✅ You may also withdraw up to $60,000 tax-free from your RRSP under the Home Buyers’ Plan (HBP).</li>
          <li>📌 Tip: Both spouses can withdraw up to $60,000 from their RRSPs under the HBP and the FHSA can also be utilized.</li>
        </ul>

        <h3>Interest on Student Loans – Tax Credit</h3>
        <ul>
          <li>✅ Get a 15% tax credit on interest paid for Canada Student Loans and provincial loans.</li>
          <li>✅ Interest payments can be carried forward for up to five years.</li>
          <li>📌 Tip: Private loans and employer-paid loans don’t qualify—only government student loans do.</li>
        </ul>

        <div class="tax-tip-box">
          <h4>💡Final Thoughts: Don’t Miss Out!</h4>
          <p>Many Canadians miss out on deductions and credits simply because they don’t know they exist. By claiming what you’re entitled to, you can lower your tax bill and keep more money in your pocket.</p>
        </div>
      `,
      metaDescription: "Expert Vancouver tax return services for 2024. Professional CPA firm offering comprehensive tax preparation, planning, and filing services. Get maximum returns with our local tax experts.",
      tags: ["vancouver tax services", "tax return vancouver", "cpa firm vancouver", "professional tax services", "local tax accountant"],
      image: "/assets/blog/vancouver-skyline.png",
      relatedPosts: ["canadian-business-tax-planning", "vancouver-remote-worker-tax-guide"],
      faqs: [
        {
          question: "When is the tax filing deadline in Canada for 2024?",
          answer: "The tax filing deadline for most Canada residents is April 30, 2024. Self-employed individuals have until June 15, 2024."
        },
        {
          question: "What tax services do you offer in Canada?",
          answer: "We offer comprehensive tax services including personal tax returns, corporate tax planning, GST/HST filing, and strategic tax planning."
        }
      ]
    },
    "canadian-investment-tax-planning": {
      title: "Canadian Investment Tax Planning Guide | Tax Planning Services",
      date: "March 5, 2024",
      category: "Tax Planning",
      author: "Nova Tax Team",
      content: `
        <p>As a Canadian investor, it's important to understand the tax implications of your investments. Our team of experienced tax professionals has put together this comprehensive guide to help you navigate the complexities of investment tax planning.</p>
        <h2>Key Points in the Investment Tax Planning Guide</h2>
        <ul>
          <li><strong>Understanding TFSA and RRSP</strong>: Learn the basics of TFSA and RRSP, including contribution limits, tax implications, and investment strategies.</li>
          <li><strong>Investment Tax Optimization</strong>: Discover how to optimize your investments for tax efficiency, including tax-loss harvesting, asset location, and tax-efficient withdrawal strategies.</li>
          <li><strong>Strategic Timing of Investments</strong>: Understand the tax implications of buying, selling, and holding investments, and how to strategically time your investment decisions for tax savings.</li>
        </ul>
        <p>By understanding these key points, you can ensure your investments are tax-efficient and maximize your after-tax returns.</p>
        <h2>Why Choose Nova Tax for Your Investment Tax Planning Needs?</h2>
        <p>Nova Tax is a team of experienced tax professionals dedicated to helping Canadian investors navigate the complexities of investment tax planning. Our team provides personalized investment tax planning services tailored to your unique needs and goals.</p>
        <p>With our expertise, you can:</p>
        <ul>
          <li>Minimize your tax burden and maximize your after-tax returns.</li>
          <li>Ensure compliance with all investment tax laws and regulations.</li>
          <li>Focus on growing your wealth while we handle your investment tax planning needs.</li>
        </ul>
        <p>Contact us today to learn more about our investment tax planning services and how we can help you achieve your financial goals.</p>
      `,
      metaDescription: "Professional investment tax planning services in Canada. Expert CPA guidance for TFSA, RRSP, and investment tax optimization.",
      tags: ["investment tax planning", "canadian tax services", "rrsp tax planning", "tfsa optimization", "tax strategy"],
      image: "/assets/blog/investment-planning.png",
      faqs: [
        {
          question: "What are the key investment tax planning strategies?",
          answer: "Key strategies include TFSA and RRSP optimization, tax-efficient investing, and strategic timing of investments."
        }
      ]
    },
    "canada-departure-tax-guide": {
      title: "Tax Implications of Leaving Canada: Understanding Departure Tax",
      date: "January 18, 2025",
      category: "Departure Tax",
      author: "Nova Tax Team",
      content: `
      <h2>Tax Implications of Leaving Canada: Understanding Departure Tax</h2>

<p>If you're planning to leave Canada permanently, there are significant tax implications you need to consider. The Canada Revenue Agency (CRA) treats individuals who leave as non-residents, and this often triggers departure tax, which is essentially a capital gains tax on unrealized assets.</p>

<p>This guide will walk you through departure tax, how to prepare for it, and strategies to minimize the impact.</p>

<h3>1. Determining Your Residency Status</h3>
<ul>
  <li>✅ No longer have a home, spouse, or dependents in Canada.</li>
  <li>✅ Have moved permanently to another country.</li>
  <li>✅ Have closed Canadian bank accounts, sold property, and cut other primary ties.</li>
  <li>✅ Spend less than 183 days in Canada per year.</li>
  <li>📌 Tip: The CRA may still consider you a factual resident if you maintain strong ties, even if you move abroad.</li>
</ul>

<h3>2. What is Departure Tax?</h3>
<p>When you leave Canada, the CRA applies a deemed disposition on certain assets. This means you're considered to have sold your assets at fair market value, even if you haven’t actually sold them.</p>

<h4>💰 Taxable Assets Include:</h4>
<ul>
  <li>Stocks and ETFs (including non-registered investments).</li>
  <li>Private business shares.</li>
  <li>Real estate outside Canada.</li>
  <li>Personal assets worth over $10,000 (e.g., art, collectibles).</li>
</ul>

<h4>🚫 Exempt Assets:</h4>
<ul>
  <li>RRSPs, RRIFs, TFSAs (these remain tax-sheltered).</li>
  <li>Canadian real estate (taxed only upon sale).</li>
  <li>Pensions (CPP, OAS, employer pensions).</li>
</ul>

<p>📌 Tip: Principal residences in Canada are NOT subject to departure tax but may be taxable if sold after you leave.</p>

<h3>3. How Departure Tax is Calculated</h3>
<ul>
  <li>🔹 Step 1: Determine the fair market value of your taxable assets on the day before you leave Canada.</li>
  <li>🔹 Step 2: Subtract the cost base to calculate the capital gain.</li>
  <li>🔹 Step 3: 50% of the capital gain is taxable at your marginal tax rate.</li>
</ul>

<h4>📌 Example:</h4>
<ul>
  <li>You purchased stocks for $50,000, and on your departure date, they are worth $200,000.</li>
  <li>Capital gain = $200,000 - $50,000 = $150,000.</li>
  <li>Taxable portion = $150,000 × 50% = $75,000.</li>
  <li>This $75,000 is added to your income for your final tax return.</li>
</ul>
<p>📌 Tip: You may be able to postpone paying departure tax, consult a tax expert to learn more.</p>

<h3>4. Strategies to Reduce Departure Tax</h3>
<ul>
  <li>✅ Sell Certain Assets Before Leaving – Selling investments with capital losses can offset taxable capital gains and reduce departure tax.</li>
  <li>✅ Use the Principal Residence Exemption – Selling your Canadian home before leaving can avoid potential capital gains tax as a non-resident.</li>
  <li>✅ Contribute to RRSPs Before Leaving – Maximizing RRSP contributions lowers taxable income and departure tax liability.</li>
  <li>✅ Consider Tax Treaties – Moving to a tax treaty country (e.g., the U.S.) may provide relief for departure tax or allow capital gains to be deferred.</li>
</ul>

<h3>5. Non-Resident Tax Considerations</h3>
<ul>
  <li>✅ Withholding Tax on Canadian Income – If you receive rental income, dividends, or pensions, a 25% withholding tax applies (may be reduced under tax treaties).</li>
  <li>✅ No More Canadian Tax on Foreign Income – You only pay tax in your new country of residence.</li>
  <li>✅ Canadian Real Estate Tax Implications – If you sell Canadian property as a non-resident, you must file for a clearance certificate and withhold 25% of the sale proceeds until CRA confirms the actual tax amount.</li>
</ul>
<p>📌 Tip: You may still have to file a final Canadian tax return for the year you leave.</p>

<div class="tax-tip-box">
  <h4>💡 Final Thoughts: Plan Your Exit Carefully</h4>
  <p>Leaving Canada has major tax implications, and departure tax can be a significant financial burden. With careful planning—like timing asset sales, maximizing RRSPs, and leveraging tax treaties—you can minimize your tax bill and ensure a smooth transition.</p>
</div>
            `,
      metaDescription: "Expert GST/HST guidance for Canadian businesses. Professional tax accounting services for registration, filing, and compliance. Licensed CPA assistance.",
      tags: ["gst/hst filing", "canadian tax services", "small business tax", "tax accountant", "business tax help"],
      image: "/assets/blog/small-business.png",
      faqs: [
        {
          question: "When should a business register for GST/HST?",
          answer: "Businesses must register when their total revenue exceeds $30,000 in the last four consecutive calendar quarters."
        }
      ]
    },
    "canadian-business-tax-planning": {
      title: "Tax Planning for High-Income Earners: Smart Strategies to Reduce Tax",
      date: "January 25, 2025",
      category: "Tax Planning",
      author: "Nova Tax Team",
      content: `
       <h2>Tax Planning for High-Income Earners: Smart Strategies to Reduce Tax</h2>
       <p>For high-income earners in Canada, effective tax planning is essential to minimize tax liabilities while staying compliant with CRA regulations. With marginal tax rates reaching over 50% in some provinces, strategic planning can significantly impact wealth accumulation and cash flow. Here are some smart tax-saving strategies to consider.</p>
      <h3>Maximize RRSP Contributions</h3>
      <p>Registered Retirement Savings Plans (RRSPs) allow you to defer tax on contributions and grow investments tax-free until withdrawal. High-income earners can benefit from:</p>
      <ul>
        <li>✅ Tax Deduction – Contributions reduce taxable income, lowering your immediate tax bill.</li>
        <li>✅ Tax-Deferred Growth – Investments inside an RRSP grow without annual tax implications.</li>
        <li>✅ Carry-Forward Option – If you don’t max out your contribution room, you can carry it forward to future years when your tax rate is even higher.</li>
      </ul>
      <h3>Utilize a Tax-Free Savings Account (TFSA)</h3>
      <p>A TFSA is an excellent vehicle for tax-free investment growth. While contributions are not tax-deductible, withdrawals (including investment gains) are completely tax-free. High-income earners should use a TFSA for:</p>
      <ul>
        <li>✅ Investing in high-growth assets without tax consequences on gains.</li>
        <li>✅ Flexible withdrawals – No tax upon withdrawal, unlike RRSPs.</li>
        <li>✅ Preserving wealth outside of taxable accounts.</li>
      </ul>
      <h3>Optimize Income Splitting</h3>
      <p>Due to the Tax on Split Income (TOSI) rules, traditional income splitting has become more restrictive, but there are still legal ways to shift income to lower-income family members:</p>
      <ul>
        <li>✅ Spousal RRSPs – A higher-income spouse can contribute to a spousal RRSP, allowing income to be taxed at a lower rate upon withdrawal.</li>
        <li>✅ Family Trusts – A well-structured trust can distribute investment income and capital gains to lower-income family members.</li>
        <li>✅ Gifting Investments – If done properly, gifting assets to a spouse or child in a lower tax bracket can reduce overall family taxation.</li>
      </ul>
      <h3>Consider Incorporating Your Business</h3>
      <p>If you earn significant self-employment or professional income, incorporating can lead to tax deferral and strategic income splitting:</p>
      <ul>
        <li>✅ Lower Corporate Tax Rates – Instead of paying high personal tax rates, income can be retained in the corporation at a lower tax rate.</li>
        <li>✅ Income Deferral – Keep earnings in the company and withdraw them in lower-income years.</li>
        <li>✅ Dividend Payments – Paying yourself in dividends instead of salary may be more tax-efficient.</li>
      </ul>
      <h3>Use a Holding Company for Tax Deferral</h3>
      <p>A holding company can be used to accumulate excess corporate earnings while avoiding immediate personal taxation. Benefits include:
</p>
      <ul>
        <li>✅ Protecting assets from creditors.</li>
        <li>✅ Reinvesting retained earnings without triggering personal income tax.</li>
        <li>✅ Facilitating estate and succession planning.</li>
      </ul>
      <h3>Take Advantage of Charitable Donations</h3>
      <p>If you regularly donate to charities, consider tax-efficient giving strategies:
</p>
      <ul>
        <li>✅ Donation Tax Credit – Receive up to 75% of net income as a charitable tax credit.</li>
        <li>✅ Donating Securities – Avoid capital gains tax by donating appreciated stocks instead of cash.</li>
        <li>✅ Private Foundations – High-income earners can set up a family foundation to support causes while receiving long-term tax benefits.</li>
      </ul>
      <h3>Manage Capital Gains Effectively</h3>
      <p>For those with significant investments, managing capital gains tax can save thousands annually:
</p>
      <ul>
        <li>✅ Timing Asset Sales – Realizing gains in lower-income years can reduce taxes.</li>
        <li>✅ Capital Gains Exemption – If selling shares of a Canadian-Controlled Private Corporation (CCPC), you may qualify for the Lifetime Capital Gains Exemption (LCGE) ($1.25M in 2024).</li>
        <li>✅ Tax-Loss Harvesting – Offset capital gains by selling losing investments to reduce taxable income.</li>
      </ul>
      <h3>Estate Planning to Minimize Future Tax Liabilities</h3>
      <p>Proper estate planning ensures wealth is transferred tax-efficiently to the next generation:</p>
      <ul>
        <li>✅ Alter Ego and Joint Partner Trusts – Useful for deferring probate fees and simplifying estate transfers.</li>
        <li>✅ Estate Freezes – Lock in today’s tax liability and transfer future growth to the next generation.</li>
        <li>✅ Gifting Assets During Your Lifetime – Strategic gifting can reduce estate tax burdens.</li>
      </ul>
       <div class="tax-tip-box">
          <h4>💡Final Thoughts: Tax Efficiency is Key for Wealth Preservation</h4>
             <p>High-income earners must take a proactive approach to tax planning. By utilizing RRSPs, TFSAs, income splitting, corporate structures, and estate planning strategies, you can significantly reduce tax burdens while maximizing long-term wealth.</p>
        </div>
           `,
      metaDescription: "Expert tax planning strategies for Canadian businesses. Professional corporate tax services to optimize your business tax position and maximize savings.",
      tags: ["tax planning canada", "corporate tax services", "business tax planning", "canadian tax accountant", "tax strategy"],
      image: "/assets/blog/corporate-meeting.png",
      faqs: [
        {
          question: "What are effective tax planning strategies for Canadian businesses?",
          answer: "Effective strategies include income splitting, tax-efficient compensation, and strategic timing of expenses and investments."
        }
      ]
    },
    "family-trust-tax-savings": {
      title: "How a Family Trust Can Help Business Owners Save Taxes | Professional Tax Services",
      date: "December 10, 2024",
      category: "Tax Planning",
      author: "Nova Tax Team",
      content: `
        <h2>How a Family Trust Can Help Business Owners Save Taxes</h2>

<p>A family trust is a powerful tool that helps business owners protect assets, distribute income tax-efficiently, and plan for a tax-free business sale. When properly structured within a corporate group, it allows for multiplying the Lifetime Capital Gains Exemption (LCGE) and using a corporate beneficiary to defer taxes and purify the business for sale.</p>

<h3>1. What is a Family Trust?</h3>
<p>A family trust is a legal arrangement where a trustee manages assets (such as shares of a business) on behalf of the beneficiaries, which may include:</p>
<ul>
  <li>Family members (spouse, children, relatives)</li>
  <li>A corporate beneficiary (another company owned by the family)</li>
</ul>
<p>A properly structured family trust allows income and capital gains to be distributed in a tax-efficient way, helping minimize overall tax liability and plan for future business succession.</p>

<h3>2. Utilizing the Family Trust in a Corporate Group to Multiply the LCGE</h3>
<p>One of the biggest tax benefits of using a family trust in a corporate structure is the ability to multiply the Lifetime Capital Gains Exemption (LCGE) when selling a business.</p>

<h4>What is the LCGE?</h4>
<p>The LCGE allows business owners to sell shares of a Canadian-Controlled Private Corporation (CCPC) and shelter up to $1.25 million (2024 limit) in capital gains from tax.</p>

<h4>How a Family Trust Helps Multiply LCGE</h4>
<p>If the shares of the business are owned personally, only the individual owner can claim the LCGE. However, if the shares are held by a family trust, the capital gains can be allocated to multiple beneficiaries—each of whom may claim their own $1.25M LCGE. Alternative minimum taxes (AMT) may apply.</p>

<h4>📌 Example:</h4>
<ul>
  <li>If a business owner sells their company for $3 million and the shares are held in a family trust, the capital gain can be split among three beneficiaries (e.g., the business owner, spouse, and adult child), potentially sheltering the entire $3 million from tax rather than just $1.25M.</li>
</ul>

<h3>3. Using a Corporate Beneficiary & Its Tax Benefits</h3>
<p>A corporate beneficiary is another company that is named as a beneficiary of the family trust. Instead of distributing all business profits to individual beneficiaries (who must pay tax immediately), the trust can allocate income to the corporate beneficiary, offering key tax advantages.</p>

<h4>Key Benefits of a Corporate Beneficiary:</h4>
<ul>
  <li>✅ <strong>Tax-Free Dividend Flow</strong> – The family trust can distribute dividends tax-free to the corporate beneficiary under the inter-corporate dividend rules. This keeps cash inside the corporate group without triggering immediate personal tax.</li>
  <li>✅ <strong>Deferring Personal Taxes</strong> – If dividends are paid to individuals, they are taxed immediately. However, by allocating them to a corporate beneficiary, the money can be held in the company and:
    <ul>
      <li>Reinvested in the business</li>
      <li>Used for future investments</li>
      <li>Withdrawn later when tax rates may be lower</li>
    </ul>
    This strategy delays personal tax payments, allowing wealth to grow more efficiently.</li>
  <li>✅ <strong>Keeping the Business “Clean” for LCGE</strong> – To qualify for the LCGE, a company must have at least 90% of its assets used in active business operations. If too much cash or passive investments accumulate in the company, it may lose LCGE eligibility.</li>
</ul>

<h4>📌 Solution:</h4>
<ul>
  <li>By moving excess cash from OpCo to a corporate beneficiary, the business remains 'purified' and eligible for a tax-free sale under LCGE rules.</li>
</ul>

<div class="tax-tip-box">
  <h4>💡 Final Thoughts: Is a Family Trust Right for You?</h4>
  <p>A family trust with a corporate beneficiary is a powerful tax-saving tool for business owners looking to:</p>
  <ul>
    <li>Multiply the LCGE for a tax-free business sale</li>
    <li>Defer taxes on retained earnings</li>
    <li>Ensure their company remains eligible for LCGE</li>
  </ul>
</div>
   `,
      metaDescription: "Expert tax advice for remote workers in Vancouver. Learn about home office deductions, eligible expenses, and how to maximize your tax returns.",
      tags: ["remote work tax deductions", "vancouver tax services", "work from home tax benefits", "professional tax help", "vancouver cpa"],
      image: "/assets/blog/remote-work.png",
      faqs: [
        {
          question: "What home office expenses can remote workers claim?",
          answer: "Remote workers can claim a portion of rent/mortgage interest, utilities, internet, and office supplies when working from home."
        }
      ]
    }
  };

  const post = posts[slug];
  const shareUrl = `${baseUrl}/blog/${slug}`;

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={`${baseUrl}${post.image}`} />
        <meta property="og:url" content={shareUrl} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`${baseUrl}${post.image}`} />

        {/* Article structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.metaDescription,
            "image": `${baseUrl}${post.image}`,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": "Nova Tax",
              "description": "Professional Tax Services in Vancouver"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Nova Tax",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/assets/logo.png`
              }
            }
          })}
        </script>

        {/* FAQ structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <Link to="/blog" className="back-to-blog">
        <FaArrowLeft /> Back to Blog
      </Link>

      <section className="service-page">
        <div className="service-header">
          <div className="header-content">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              <span className="post-category">{post.category}</span>
            </div>
          </div>
        </div>

        <div className="service-content">
          <article className="blog-post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="post-cta">
            <h3>Need Professional Tax Assistance?</h3>
            <p>Contact Nova Tax today for expert tax services tailored to your needs.</p>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="cta-button">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost; 