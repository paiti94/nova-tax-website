import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicePage.css';
import '../styles/Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "The Best Tax Deductions and Credits for Canadians",
      slug: "Best-tax-Deductions-guide",
      excerpt: "Tax season can be overwhelming, but taking advantage of the right deductions and credits can help you reduce your tax bill and maximize your refund. Here are some of the top tax-saving opportunities available to Canadians.",
      date: "February 18, 2025",
      category: "Tax Returns",
      image: "/assets/blog/tax-deduction.png",
      tags: ["canada tax services", "tax return vancouver", "cpa firm vancouver", "cpa firm Toronto","cpa firm Canada", "professional tax services", "local tax accountant"],
      metaDescription: "Comprehensive guide to Canada 2024's tax returns. Expert tax preparation services from licensed CPAs. Find professional tax help near you all across Canada."
    },
    {
      id: 2,
      title: "Tax Planning for High-Income Earners: Smart Strategies to Reduce Tax",
      slug: "canadian-business-tax-planning",
      excerpt: "For high-income earners in Canada, effective tax planning is essential to minimize tax liabilities while staying compliant with CRA regulations. With marginal tax rates reaching over 50% in some provinces, strategic planning can significantly impact wealth accumulation and cash flow. Here are some smart tax-saving strategies to consider.",
      date: "January 25, 2025",
      category: "Tax Planning",
      image: "/assets/blog/tax-planning.png",
      tags: ["tax planning canada", "corporate tax services", "business tax planning", "canadian tax accountant", "tax strategy"],
      metaDescription: "Expert tax planning strategies for Canadian businesses. Professional corporate tax services to optimize your business tax position and maximize savings."
    },
    {
      id: 3,
      title: "Tax Implications of Leaving Canada: Understanding Departure Tax | Tax Accountant Services",
      slug: "canada-departure-tax-guide",
      excerpt: "If you're planning to leave Canada permanently, there are significant tax implications you need to consider. The Canada Revenue Agency (CRA) treats individuals who leave as non-residents, and this often triggers departure tax, which is essentially a capital gains tax on unrealized assets.",
      date: "January 18, 2025",
      category: "Tax Returns",
      image: "/assets/blog/departure-tax.png",
      tags: ["departure tax", "tax strategy", "canadian tax services", "tax accountant", "business tax help"],
      metaDescription: "Expert departure tax guide for Canadians. Professional tax accounting services for departure tax implications and compliance. Licensed CPA assistance."
    },
    {
      id: 4,
      title: "How a Family Trust Can Help Business Owners Save Taxes | Professional Tax Services",
      slug: "family-trust-tax-savings",
      excerpt: "A family trust is a powerful tool that helps business owners protect assets, distribute income tax-efficiently, and plan for a tax-free business sale. When properly structured within a corporate group, it allows for multiplying the Lifetime Capital Gains Exemption (LCGE) and using a corporate beneficiary to defer taxes and purify the business for sale.",
      date: "December 10, 2024",
      category: "Tax Planning",
      image: "/assets/blog/family-trust.png",
      tags: ["family trust", "tax strategy","tax planning", "canadian tax services", "tax accountant", "business tax help"],
      metaDescription: "Expert family trust guide for business owners. Professional tax accounting services for tax-efficient asset protection and business sale planning."
    },
    // {
    //   id: 5,
    //   title: "Canadian Investment Tax Planning Guide | Tax Planning Services",
    //   slug: "canadian-investment-tax-planning",
    //   excerpt: "Expert investment tax planning strategies for Canadians. Professional guidance on TFSA, RRSP, and investment tax optimization from experienced CPAs.",
    //   date: "March 5, 2024",
    //   category: "Tax Planning",
    //   image: "/assets/blog/investment-planning.png",
    //   tags: ["investment tax planning", "canadian tax services", "rrsp tax planning", "tfsa optimization", "tax strategy"],
    //   metaDescription: "Professional investment tax planning services in Canada. Expert CPA guidance for TFSA, RRSP, and investment tax optimization."
    // }
  ];

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <section className="service-page">
      <div className="service-header">
        <div className="header-content">
          <h1>Tax Insights & Updates</h1>
          <p>Expert tax advice and latest updates from Nova Tax professionals</p>
        </div>
      </div>

      <div className="service-content">
        <div className="blog-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <Link to={`/blog/${post.slug}`}>
                <article key={post.id} className="blog-card">
              {post.image && (
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <Link to={`/blog/${post.slug}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 