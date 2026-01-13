type TArticleCategoryButtonProps = {
    articleCategory: string,
    newArticleCategory: string,
    handleArticleCategory: (newArticleCategory: string) => void
}

export const ArticleCategoryButton = ({articleCategory, newArticleCategory, handleArticleCategory} : TArticleCategoryButtonProps) => {
    return (
        <button className={`${articleCategory ===  newArticleCategory?
            'bg-[#0C71E4] hover:bg-[#0855ae] text-white' :
            'bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] '}
                        px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm sm:text-base lg:text-lg`}
            onClick={() => handleArticleCategory(newArticleCategory)}>
            {newArticleCategory}
        </button>
    )
}
