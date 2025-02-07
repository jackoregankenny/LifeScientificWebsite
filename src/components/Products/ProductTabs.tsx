'use client'
import { useState } from 'react';
import { ProductVariantStoryblok, ActiveIngredientsStoryblok, ProductDocumentsStoryblok } from '@/types/storyblok';
import RichText from '@/components/storyblok/RichText';
import type { ISbRichtext } from '@storyblok/react';

interface ProductTabsProps {
  description: ISbRichtext;
  variants: ProductVariantStoryblok[];
  activeIngredients?: ActiveIngredientsStoryblok[];
  documents?: ProductDocumentsStoryblok[];
}

export default function ProductTabs({ 
  description, 
  variants, 
  activeIngredients = [], 
  documents = [] 
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', show: !!description },
    { id: 'specifications', label: 'Specifications', show: variants?.length > 0 },
    { id: 'ingredients', label: 'Active Ingredients', show: activeIngredients.length > 0 },
    { id: 'documents', label: 'Documents', show: documents.length > 0 },
  ].filter(tab => tab.show);

  // If no tabs are available, don't render anything
  if (tabs.length === 0) return null;

  // Set active tab to first available tab if current tab is not in available tabs
  const availableTabIds = tabs.map(tab => tab.id);
  if (!availableTabIds.includes(activeTab)) {
    setActiveTab(availableTabIds[0]);
  }

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
          <RichText document={description} />
        )}

        {activeTab === 'specifications' && variants && (
          <div className="grid gap-6">
            {variants.map((variant) => (
              <div key={variant._uid} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">{variant.crop} {variant.name}</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {variant.approval_number && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Approval Number</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{variant.approval_number}</dd>
                    </div>
                  )}
                  {variant.formulation_type && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Formulation Type</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{variant.formulation_type}</dd>
                    </div>
                  )}
                  {variant.mechanism_of_action && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode of Action</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{variant.mechanism_of_action}</dd>
                    </div>
                  )}
                  {variant.container_size && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Container Size</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        {variant.container_size} {variant.size_unit}
                      </dd>
                    </div>
                  )}
                  {variant.country && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Market</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{variant.country}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ingredients' && activeIngredients.length > 0 && (
          <div className="space-y-6">
            {activeIngredients.map((section) => (
              <div key={section._uid} className="prose dark:prose-invert max-w-none">
                {section.name && <h3>{section.name}</h3>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                      {section.amount} {section.units}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && documents.length > 0 && (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc._uid} className="space-y-4">
                {doc.link && (
                  <a
                    href={doc.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {doc.document_name} Document
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 