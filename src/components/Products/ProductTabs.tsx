'use client'
import { useState } from 'react';
import { ProductVariantStoryblok } from '@/types/storyblok';

interface ProductTabsProps {
  description: string;
  variants: ProductVariantStoryblok[];
  activeIngredients?: any[];
  documents?: any[];
}

export default function ProductTabs({ description, variants, activeIngredients = [], documents = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications', show: variants?.length > 0 },
    { id: 'ingredients', label: 'Active Ingredients', show: activeIngredients.length > 0 },
    { id: 'documents', label: 'Documents', show: documents.length > 0 },
  ].filter(tab => tab.show !== false);

  return (
    <div className="mt-8">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === 'description' && description && (
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}

        {activeTab === 'specifications' && variants?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variants.map((variant) => (
              <div key={variant._uid} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold mb-4">{variant.crop} Variant</h3>
                <dl className="space-y-3">
                  {variant.approval_number && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 dark:text-gray-400">Approval Number:</dt>
                      <dd className="font-medium">{variant.approval_number}</dd>
                    </div>
                  )}
                  {variant.formulation_type && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 dark:text-gray-400">Formulation:</dt>
                      <dd className="font-medium">{variant.formulation_type}</dd>
                    </div>
                  )}
                  {variant.container_size && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 dark:text-gray-400">Size:</dt>
                      <dd className="font-medium">{`${variant.container_size} ${variant.size_unit}`}</dd>
                    </div>
                  )}
                  {variant.country && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 dark:text-gray-400">Market:</dt>
                      <dd className="font-medium">{variant.country}</dd>
                    </div>
                  )}
                  {variant.mechanism_of_action && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 dark:text-gray-400">Mode of Action:</dt>
                      <dd className="font-medium">{variant.mechanism_of_action}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ingredients' && activeIngredients?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeIngredients.map((ingredient: any) => (
              <div key={ingredient._uid} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-semibold mb-2">{ingredient.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {ingredient.amount} {ingredient.units}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && documents?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc: any) => (
              <a
                key={doc._uid}
                href={doc.link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                    {doc.document_name} Document
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Click to view or download
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 