class ExpendituresController < ApplicationController
    def index
        expenditures = Expenditure.all
        render json: expenditures
    end

    def destroy
        Expenditure.find(params[:id]).destroy
    end
end
