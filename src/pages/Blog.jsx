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
      title: "Vancouver Tax Return Services: Complete 2024 Guide | Professional CPA Firm",
      slug: "vancouver-tax-return-guide-2024",
      excerpt: "Expert guide to filing tax returns in Vancouver. Learn about local tax benefits, deadlines, and how our Vancouver CPA firm can maximize your returns. Professional tax services near you.",
      date: "March 21, 2024",
      category: "Tax Returns",
      image: "/assets/blog/vancouver-skyline.png",
      tags: ["vancouver tax services", "tax return vancouver", "cpa firm vancouver", "professional tax services", "local tax accountant"],
      metaDescription: "Comprehensive guide to Vancouver tax returns in 2024. Expert tax preparation services from licensed CPAs. Find professional tax help near you in Vancouver, BC."
    },
    {
      id: 2,
      title: "Tax Planning Strategies for Canadian Businesses | Corporate Tax Services",
      slug: "canadian-business-tax-planning",
      excerpt: "Discover effective tax planning strategies for Canadian businesses. Our expert CPAs provide comprehensive corporate tax services to minimize tax liability and maximize savings.",
      date: "March 19, 2024",
      category: "Tax Planning",
      image: "/assets/blog/corporate-meeting.png",
      tags: ["tax planning canada", "corporate tax services", "business tax planning", "canadian tax accountant", "tax strategy"],
      metaDescription: "Expert tax planning strategies for Canadian businesses. Professional corporate tax services to optimize your business tax position and maximize savings."
    },
    {
      id: 3,
      title: "GST/HST Guide for Canadian Small Businesses | Tax Accountant Services",
      slug: "canada-gst-hst-guide",
      excerpt: "Complete GST/HST guide for Canadian businesses. Expert tax accounting services to help with registration, filing, and compliance. Professional CPA assistance available.",
      date: "March 15, 2024",
      category: "Business Tax",
      image: "/assets/blog/small-business.png",
      tags: ["gst/hst filing", "canadian tax services", "small business tax", "tax accountant", "business tax help"],
      metaDescription: "Expert GST/HST guidance for Canadian businesses. Professional tax accounting services for registration, filing, and compliance. Licensed CPA assistance."
    },
    {
      id: 4,
      title: "Vancouver Remote Worker Tax Benefits 2024 | Professional Tax Services",
      slug: "vancouver-remote-worker-tax-guide",
      excerpt: "Maximize your tax benefits as a remote worker in Vancouver. Expert guidance on home office deductions, expenses, and tax savings from professional CPAs.",
      date: "March 10, 2024",
      category: "Tax Returns",
      image: "/assets/blog/remote-work.png",
      tags: ["remote work tax deductions", "vancouver tax services", "work from home tax benefits", "professional tax help", "vancouver cpa"],
      metaDescription: "Expert tax advice for remote workers in Vancouver. Learn about home office deductions, eligible expenses, and how to maximize your tax returns."
    },
    {
      id: 5,
      title: "Canadian Investment Tax Planning Guide | Tax Planning Services",
      slug: "canadian-investment-tax-planning",
      excerpt: "Expert investment tax planning strategies for Canadians. Professional guidance on TFSA, RRSP, and investment tax optimization from experienced CPAs.",
      date: "March 5, 2024",
      category: "Tax Planning",
      image: "/assets/blog/investment-planning.png",
      tags: ["investment tax planning", "canadian tax services", "rrsp tax planning", "tfsa optimization", "tax strategy"],
      metaDescription: "Professional investment tax planning services in Canada. Expert CPA guidance for TFSA, RRSP, and investment tax optimization."
    }
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 