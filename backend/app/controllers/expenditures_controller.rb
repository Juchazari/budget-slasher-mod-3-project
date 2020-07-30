class ExpendituresController < ApplicationController
    def index
        expenditures = Expenditure.all
        render json: expenditures
    end

    def create
        list1 = List.find(params[:list])
        item1 = Expenditure.create({list_id: list1.id})
        render json: item1
    end

    def update
        expenditure = Expenditure.find(params[:id])
        expenditure.update(expenditure_params)
        
        render json: expenditure
    end

    def destroy
        Expenditure.find(params[:id]).destroy
    end

    private

        def expenditure_params
            params.require(:expenditure).permit(:name, :price, :deadline)
        end
end
