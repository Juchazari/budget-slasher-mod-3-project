class ExpendituresController < ApplicationController
    def index
        expenditures = Expenditure.all
        render json: expenditures
    end

    def create
        list = List.find(params[:list])
        item = Expenditure.create({list: list})
        render json: item
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
