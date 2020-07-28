class List < ApplicationRecord
  belongs_to :user
  has_many :expenditures, :dependent => :delete_all
end
