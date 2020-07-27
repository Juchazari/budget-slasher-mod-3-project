class ExpendituresController < ApplicationController
    def index
        expenditures = Expenditure.all
        render json: expenditures
    end
end
