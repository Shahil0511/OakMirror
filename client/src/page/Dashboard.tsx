import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ThumbsUp, MessageSquare, Flag, Star, Briefcase, DollarSign, Clock } from 'lucide-react';

interface Company {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    salaryInfo: string;
    industry: string;
}

interface Review {
    id: string;
    companyId: string;
    author: string;
    rating: number;
    content: string;
    date: string;
    likes: number;
    isLiked: boolean;
}

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [activeTab, setActiveTab] = useState<'reviews' | 'jobs' | 'salaries' | 'interviews'>('reviews');
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            companyId: '1',
            author: 'Anonymous Employee',
            rating: 4,
            content: 'Great work environment but management could be better.',
            date: '2023-10-15',
            likes: 12,
            isLiked: false
        },
        {
            id: '2',
            companyId: '1',
            author: 'Former Employee',
            rating: 2,
            content: 'Poor work-life balance. High turnover rate.',
            date: '2023-09-28',
            likes: 5,
            isLiked: false
        }
    ]);

    const companies: Company[] = [
        { id: '1', name: 'AB Star News', rating: 3.8, reviewCount: 24, salaryInfo: '₹25k-₹45k', industry: 'Media' },
        { id: '2', name: 'Chawala Restaurant', rating: 4.2, reviewCount: 18, salaryInfo: '₹18k-₹30k', industry: 'Hospitality' },
        { id: '3', name: 'Karims Restaurant', rating: 4.5, reviewCount: 32, salaryInfo: '₹20k-₹35k', industry: 'Hospitality' },
        { id: '4', name: 'P News', rating: 3.5, reviewCount: 12, salaryInfo: '₹22k-₹40k', industry: 'Media' },
        { id: '5', name: 'FM News', rating: 3.9, reviewCount: 21, salaryInfo: '₹28k-₹50k', industry: 'Media' },
        { id: '6', name: '4 TV', rating: 3.7, reviewCount: 15, salaryInfo: '₹30k-₹55k', industry: 'Broadcasting' },
        { id: '7', name: 'Pioneer Ventures', rating: 4.1, reviewCount: 27, salaryInfo: '₹35k-₹60k', industry: 'Finance' },
        { id: '8', name: 'Pioneer Food and Beverage', rating: 4.0, reviewCount: 19, salaryInfo: '₹25k-₹45k', industry: 'FMCG' }
    ];

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLikeReview = (reviewId: string) => {
        setReviews(reviews.map(review => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    likes: review.isLiked ? review.likes - 1 : review.likes + 1,
                    isLiked: !review.isLiked
                };
            }
            return review;
        }));
    };

    const handleReportReview = (reviewId: string) => {
        // In a real app, this would trigger a report modal or API call
        alert(`Report submitted for review ${reviewId}`);
    };

    const companyReviews = selectedCompany
        ? reviews.filter(review => review.companyId === selectedCompany.id)
        : [];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800">Company Insights</h1>
                <p className="text-gray-600">Discover company reviews, salaries, and interview experiences</p>
            </motion.header>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mb-8"
            >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search for companies..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Company List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 bg-blue-600 text-white">
                            <h2 className="text-lg font-semibold">Companies</h2>
                        </div>
                        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {filteredCompanies.map((company) => (
                                <motion.div
                                    key={company.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 cursor-pointer transition-colors ${selectedCompany?.id === company.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => setSelectedCompany(company)}
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-900">{company.name}</h3>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="ml-1 text-sm font-medium">{company.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-1 flex justify-between text-sm text-gray-500">
                                        <span>{company.industry}</span>
                                        <span>{company.reviewCount} reviews</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Company Details */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedCompany ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                                            <p className="text-gray-600">{selectedCompany.industry}</p>
                                        </div>
                                        <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                            <span className="ml-1 text-lg font-bold">{selectedCompany.rating.toFixed(1)}</span>
                                            <span className="ml-1 text-gray-600">({selectedCompany.reviewCount})</span>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className="mt-6 border-b border-gray-200">
                                        <nav className="-mb-px flex space-x-8">
                                            {(['reviews', 'jobs', 'salaries', 'interviews'] as const).map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                >
                                    {activeTab === 'reviews' && (
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-medium">Company Reviews</h3>
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                    Write a Review
                                                </button>
                                            </div>

                                            {companyReviews.length > 0 ? (
                                                <div className="space-y-6">
                                                    {companyReviews.map((review) => (
                                                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                                            <div className="flex items-center mb-2">
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                                                            </div>
                                                            <h4 className="font-medium">{review.author}</h4>
                                                            <p className="mt-2 text-gray-700">{review.content}</p>
                                                            <div className="mt-4 flex space-x-4">
                                                                <button
                                                                    onClick={() => handleLikeReview(review.id)}
                                                                    className={`flex items-center text-sm ${review.isLiked ? 'text-blue-600' : 'text-gray-500'}`}
                                                                >
                                                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                                                    <span>Helpful ({review.likes})</span>
                                                                </button>
                                                                <button className="flex items-center text-sm text-gray-500">
                                                                    <MessageSquare className="h-4 w-4 mr-1" />
                                                                    <span>Comment</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReportReview(review.id)}
                                                                    className="flex items-center text-sm text-gray-500"
                                                                >
                                                                    <Flag className="h-4 w-4 mr-1" />
                                                                    <span>Report</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-gray-500">
                                                    No reviews yet. Be the first to review!
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'jobs' && (
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium mb-6">Job Openings</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium">Content Writer</h4>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Briefcase className="h-4 w-4 mr-1" />
                                                            <span>Full-time</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                                        <DollarSign className="h-4 w-4 mr-1" />
                                                        <span>₹25,000 - ₹35,000 per month</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        <span>Posted 3 days ago</span>
                                                    </div>
                                                    <button className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                                                        Apply Now
                                                    </button>
                                                </div>
                                                {/* More job listings would go here */}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'salaries' && (
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium mb-6">Salary Insights</h3>
                                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                                <h4 className="font-medium mb-2">Average Salary</h4>
                                                <p className="text-2xl font-bold">₹{selectedCompany.salaryInfo.split('-')[0].replace('₹', '')}</p>
                                                <p className="text-gray-600 text-sm">Range: {selectedCompany.salaryInfo}</p>
                                            </div>
                                            {/* Salary charts and more detailed info would go here */}
                                        </div>
                                    )}

                                    {activeTab === 'interviews' && (
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium mb-6">Interview Experiences</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 border border-gray-200 rounded-lg">
                                                    <h4 className="font-medium">Content Writer Interview</h4>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                                        <span>Experience: Positive</span>
                                                        <span className="mx-2">•</span>
                                                        <span>Difficulty: Easy</span>
                                                    </div>
                                                    <p className="mt-2 text-gray-700">The process took 2 weeks. I had a phone screening, writing test, and final interview with the editor.</p>
                                                </div>
                                                {/* More interview experiences would go here */}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center"
                        >
                            <div className="max-w-md mx-auto">
                                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a company</h3>
                                <p className="text-gray-500">Choose a company from the list to view details, reviews, and job openings.</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;