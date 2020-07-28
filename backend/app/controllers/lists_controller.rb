class ListsController < ApplicationController
    def index
        lists = List.all
        render json: lists, include: :expenditures
    end

    def destroy
        List.find(params[:id]).destroy
    end
end
