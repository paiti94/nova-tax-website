import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaLinkedin, FaTwitter, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import '../styles/ServicePage.css';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const baseUrl = 'https://novatax.ca'; // Update with your domain

  const posts = {
    "vancouver-tax-return-guide-2024": {
      title: "Vancouver Tax Return Services: Complete 2024 Guide | Professional CPA Firm",
      date: "March 21, 2024",
      category: "Tax Returns",
      author: "Nova Tax Team",
      content: `
        <h2>Complete Guide to Filing Your 2024 Tax Return in Vancouver</h2>
        
        <p>As Vancouver's leading <a href="/services/tax-prep">professional tax preparation service</a>, 
        we understand the unique tax considerations for Vancouver residents and businesses.</p>

        <h3>Expert Tax Services in Vancouver</h3>
        <ul>
          <li><a href="/services/tax-planning">Strategic Tax Planning</a> for Individuals and Businesses</li>
          <li>Professional <a href="/services/tax-prep">Tax Return Preparation</a></li>
          <li><a href="/services/cfo-services">Corporate Tax Services</a></li>
          <li>Small Business Tax Support</li>
          <li>GST/HST Filing and Compliance</li>
        </ul>

        <h3>2024 Tax Filing Deadlines for Vancouver Residents</h3>
        <ul>
          <li>Personal Tax Returns: April 30, 2024</li>
          <li>Self-employed Individuals: June 15, 2024</li>
          <li>RRSP Contributions: March 1, 2024</li>
          <li>Corporate Tax: 6 months after fiscal year-end</li>
        </ul>

        <h3>Vancouver-Specific Tax Benefits and Credits</h3>
        <p>Our <a href="/services/tax-planning">expert tax planning services</a> help Vancouver residents maximize local benefits:</p>
        <ul>
          <li>BC Tax Credits and Deductions
            <ul>
              <li>Climate Action Tax Credit</li>
              <li>BC Home Owner Grant</li>
              <li>Property Tax Deferment Program</li>
              <li>BC Training and Education Tax Credits</li>
            </ul>
          </li>
        </ul>

        <h3>Professional Tax Services Near You</h3>
        <p>Looking for professional tax services in Vancouver? Our team offers:</p>
        <ul>
          <li>In-person consultations in Vancouver</li>
          <li>Virtual tax preparation services</li>
          <li>Year-round tax planning support</li>
          <li>Expert CPA guidance</li>
        </ul>

        <h3>Tax Planning Tips for Vancouver Residents</h3>
        <ol>
          <li>Maximize RRSP and TFSA contributions</li>
          <li>Track eligible home office expenses</li>
          <li>Document transit and moving expenses</li>
          <li>Keep records of charitable donations</li>
          <li>Plan for property tax payments</li>
        </ol>

        <div class="tax-tip-box">
          <h4>💡 Pro Tax Tip:</h4>
          <p>Schedule a <a href="/#contact">free consultation</a> with our Vancouver tax experts to discover additional deductions and credits specific to your situation.</p>
        </div>
      `,
      metaDescription: "Expert Vancouver tax return services for 2024. Professional CPA firm offering comprehensive tax preparation, planning, and filing services. Get maximum returns with our local tax experts.",
      tags: ["vancouver tax services", "tax return vancouver", "cpa firm vancouver", "professional tax services", "local tax accountant"],
      image: "/assets/blog/vancouver-skyline.png",
      relatedPosts: ["canadian-business-tax-planning", "vancouver-remote-worker-tax-guide"],
      faqs: [
        {
          question: "When is the tax filing deadline in Vancouver for 2024?",
          answer: "The tax filing deadline for most Vancouver residents is April 30, 2024. Self-employed individuals have until June 15, 2024."
        },
        {
          question: "What tax services do you offer in Vancouver?",
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
    "canada-gst-hst-guide": {
      title: "GST/HST Guide for Canadian Small Businesses | Tax Accountant Services",
      date: "March 15, 2024",
      category: "Business Tax",
      author: "Nova Tax Team",
      content: `
        <p>As a small business owner in Canada, it's important to understand the Goods and Services Tax (GST) and the Harmonized Sales Tax (HST) to ensure your business is compliant with tax laws. Our team of experienced tax professionals has put together this comprehensive guide to help you navigate the complexities of GST/HST.</p>
        <h2>Key Points in the GST/HST Guide</h2>
        <ul>
          <li><strong>Understanding GST/HST</strong>: Learn the basics of GST/HST, including who needs to register, how to calculate and collect the tax, and when to file returns.</li>
          <li><strong>Input Tax Credits (ITCs)</strong>: Discover how to claim ITCs to recover the GST/HST you paid on business expenses.</li>
          <li><strong>Small Supplier Rules</strong>: Understand the rules for small suppliers, including when you need to register for GST/HST and when you can deregister.</li>
          <li><strong>Place of Supply Rules</strong>: Learn about the rules for determining the place of supply for GST/HST purposes, including the general rule, the special rules for certain supplies, and the rules for determining the place of supply of intangible personal property and services.</li>
          <li><strong>Zero-Rated Supplies</strong>: Understand what zero-rated supplies are and how they affect your GST/HST obligations.</li>
          <li><strong>Exempt Supplies</strong>: Learn about exempt supplies and how they differ from zero-rated supplies.</li>
          <li><strong>Special Rules for Charities</strong>: Discover the special GST/HST rules that apply to charities, including the public service body rebate and the special rules for charities that operate a school.</li>
        </ul>
        <p>By understanding these key points, you can ensure your business is compliant with GST/HST laws and maximize your tax savings.</p>
        <h2>Why Choose Nova Tax for Your GST/HST Needs?</h2>
        <p>Nova Tax is a team of experienced tax professionals dedicated to helping Canadian businesses navigate the complexities of GST/HST. Our team provides personalized GST/HST services tailored to your business's unique needs and goals.</p>
        <p>With our expertise, you can:</p>
        <ul>
          <li>Ensure compliance with all GST/HST laws and regulations.</li>
          <li>Maximize your tax savings by claiming all available ITCs.</li>
          <li>Focus on growing your business while we handle your GST/HST needs.</li>
        </ul>
        <p>Contact us today to learn more about our GST/HST services and how we can help your Canadian business thrive.</p>
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
      title: "Tax Planning Strategies for Canadian Businesses | Corporate Tax Services",
      date: "March 19, 2024",
      category: "Tax Planning",
      author: "Nova Tax Team",
      content: `
      <p>As a Canadian business owner, it's essential to understand the complexities of tax planning to ensure your company is taking advantage of all available tax savings opportunities. Effective tax planning can help you minimize your tax liability, maximize your cash flow, and make informed financial decisions.</p>
      <h2>Key Tax Planning Strategies for Canadian Businesses</h2>
      <p>Our team of experienced tax professionals has identified several key strategies that can help Canadian businesses optimize their tax position:</p>
      <ul>
        <li><strong>Income Splitting</strong>: By splitting income among family members or shareholders, businesses can reduce their overall tax burden.</li>
        <li><strong>Tax-Efficient Compensation</strong>: Structuring compensation packages to minimize taxes, such as through the use of dividends or bonuses.</li>
        <li><strong>Strategic Timing of Expenses and Investments</strong>: Timing the purchase of assets or incurring expenses to maximize tax deductions and minimize tax liabilities.</li>
        <li><strong>Scientific Research and Experimental Development (SR&ED) Tax Credits</strong>: Claiming tax credits for research and development activities to reduce tax liabilities.</li>
        <li><strong>Capital Cost Allowance (CCA)</strong>: Claiming depreciation on capital assets to reduce taxable income.</li>
      </ul>
      <p>By implementing these strategies, Canadian businesses can significantly reduce their tax liability and improve their financial performance.</p>
      <h2>Why Choose Nova Tax for Your Business Tax Planning Needs?</h2>
      <p>Nova Tax is a team of experienced tax professionals dedicated to helping Canadian businesses optimize their tax position. Our team provides personalized tax planning services tailored to your business's unique needs and goals.</p>
      <p>With our expertise, you can:</p>
      <ul>
        <li>Minimize your tax liability and maximize your cash flow.</li>
        <li>Make informed financial decisions with accurate tax planning and forecasting.</li>
        <li>Ensure compliance with all tax laws and regulations.</li>
        <li>Focus on growing your business while we handle your tax planning needs.</li>
      </ul>
      <p>Contact us today to learn more about our business tax planning services and how we can help your Canadian business thrive.</p>
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
    "vancouver-remote-worker-tax-guide": {
      title: "Vancouver Remote Worker Tax Benefits 2024 | Professional Tax Services",
      date: "March 10, 2024",
      category: "Tax Returns",
      author: "Nova Tax Team",
      content: `
        <p>As a remote worker in Vancouver, understanding the tax implications of working from home is crucial to maximize your tax savings. With the rise of remote work, many individuals are now eligible for home office deductions, which can significantly reduce their taxable income.</p>
        <h2>Eligibility for Home Office Deductions</h2>
        <p>To be eligible for home office deductions, you must meet the following criteria:</p>
        <ul>
          <li>You must have a dedicated workspace in your home that is used regularly for work.</li>
          <li>You must be required to work from home by your employer, or you must use your home office for a significant amount of time.</li>
        </ul>
        <p>If you meet these criteria, you can claim a portion of your rent or mortgage interest, utilities, internet, and office supplies as business expenses.</p>
        <h2>Calculating Home Office Expenses</h2>
        <p>To calculate your home office expenses, you can use one of two methods:</p>
        <ul>
          <li><strong>Simplified Method</strong>: This method allows you to claim a flat rate of $2 per square foot of home office space, up to a maximum of $1,000.</li>
          <li><strong>Actual Expenses Method</strong>: This method requires you to keep records of your actual expenses, such as utility bills and receipts for office supplies.</li>
        </ul>
        <p>It's essential to keep accurate records of your expenses, as the Canada Revenue Agency (CRA) may request documentation to support your claims.</p>
        <h2>Additional Tax Considerations for Remote Workers</h2>
        <p>As a remote worker, you may also need to consider other tax implications, such as:</p>
        <ul>
          <li>Self-employment income: If you're self-employed or a freelancer, you'll need to report your income and claim business expenses on your tax return.</li>
          <li>Employer-provided benefits: If your employer provides benefits, such as a laptop or internet reimbursement, these may be considered taxable income.</li>
        </ul>
        <p>Consulting a tax professional can help ensure you're taking advantage of all eligible deductions and credits, while also ensuring compliance with tax laws and regulations.</p>
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
            <a href="/#contact" className="cta-button">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost; 